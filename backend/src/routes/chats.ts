import { Hono } from 'hono'
import { authMiddleware, getUser } from '../middleware/auth'
import { getPool } from '../db'

export const chatsRouter = new Hono()

chatsRouter.use('*', authMiddleware)

// List chats for the current user (last message preview)
chatsRouter.get('/', async (c) => {
  const user = getUser(c)!
  const [rows] = await getPool().query(
    `SELECT ch.id,
            MAX(ms.created_at) AS last_ts,
            SUBSTRING_INDEX(MAX(CONCAT(ms.created_at, '||', ms.text)), '||', -1) AS lastMessage
       FROM chats ch
       JOIN chat_participants cp ON cp.chat_id = ch.id AND cp.user_id = ?
  LEFT JOIN messages ms ON ms.chat_id = ch.id
   GROUP BY ch.id
   ORDER BY (MAX(ms.created_at) IS NULL) ASC, last_ts DESC, ch.id DESC`,
    [Number(user.sub)]
  )
  const chats = (rows as any[]).map((r) => ({ id: r.id, lastMessage: r.lastMessage ?? '', updatedAt: r.last_ts ? new Date(r.last_ts).getTime() : Date.now() }))
  return c.json({ chats })
})

// Fetch messages in a chat (must be participant)
chatsRouter.get('/:id/messages', async (c) => {
  const user = getUser(c)!
  const chatId = Number(c.req.param('id'))
  const [part] = await getPool().query('SELECT 1 FROM chat_participants WHERE chat_id = ? AND user_id = ?', [chatId, Number(user.sub)])
  if (!(Array.isArray(part) && part.length)) return c.json({ error: 'Forbidden' }, 403)
  const [rows] = await getPool().query(
    'SELECT id, chat_id as chatId, sender_id as senderId, text, created_at as createdAt FROM messages WHERE chat_id = ? ORDER BY id ASC',
    [chatId]
  )
  // Normalize timestamps to numbers
  const messages = (rows as any[]).map((m) => ({ ...m, createdAt: new Date(m.createdAt).getTime() }))
  return c.json({ messages })
})

// Send a message (ensures membership exists)
chatsRouter.post('/:id/messages', async (c) => {
  const user = getUser(c)!
  const chatId = Number(c.req.param('id'))
  const { text } = await c.req.json()
  const pool = getPool()
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [part] = await conn.query('SELECT 1 FROM chat_participants WHERE chat_id = ? AND user_id = ?', [chatId, Number(user.sub)])
    if (!(Array.isArray(part) && part.length)) return c.json({ error: 'Forbidden' }, 403)
    const [res] = await conn.query('INSERT INTO messages (chat_id, sender_id, text) VALUES (?, ?, ?)', [chatId, Number(user.sub), text])
    await conn.query('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [chatId])
    await conn.commit()
    const message = { id: (res as any).insertId, chatId, senderId: user.sub, text, createdAt: Date.now() }
    return c.json({ message }, 201)
  } catch (e) {
    await conn.rollback()
    return c.json({ error: 'Failed to send message' }, 500)
  } finally {
    conn.release()
  }
})



