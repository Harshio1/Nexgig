import { Hono } from 'hono'
import { authMiddleware, getUser } from '../middleware/auth'
import { getPool } from '../db'

export const overviewRouter = new Hono()

overviewRouter.use('*', authMiddleware)

overviewRouter.get('/me', async (c) => {
  const user = getUser(c)!
  const userId = Number(user.sub)
  const pool = getPool()

  // Basic counts
  const [[jobsCountRows], [msgCountRows], [proposalsCountRows]] = await Promise.all([
    pool.query('SELECT COUNT(*) as cnt FROM jobs WHERE client_id = ?', [userId]),
    pool.query(
      `SELECT COUNT(*) as cnt
         FROM messages m
         WHERE m.sender_id = ? OR m.chat_id IN (
           SELECT chat_id FROM chat_participants WHERE user_id = ?
         )`,
      [userId, userId]
    ),
    pool.query(
      `SELECT COUNT(p.id) as cnt
         FROM proposals p
         JOIN jobs j ON p.job_id = j.id
        WHERE j.client_id = ?`,
      [userId]
    ),
  ])

  const jobsCount = Array.isArray(jobsCountRows) ? (jobsCountRows as any)[0]?.cnt ?? 0 : 0
  const messagesCount = Array.isArray(msgCountRows) ? (msgCountRows as any)[0]?.cnt ?? 0 : 0
  const proposalsCount = Array.isArray(proposalsCountRows) ? (proposalsCountRows as any)[0]?.cnt ?? 0 : 0

  // Recent jobs (owned by client)
  const [recentJobs] = await pool.query(
    'SELECT id, title, budget, created_at FROM jobs WHERE client_id = ? ORDER BY id DESC LIMIT 5',
    [userId]
  )

  // Recent message previews (similar to chats list, limit 3)
  const [recentMsgs] = await pool.query(
    `SELECT ch.id,
            MAX(ms.created_at) AS last_ts,
            SUBSTRING_INDEX(MAX(CONCAT(ms.created_at, '||', ms.text)), '||', -1) AS lastMessage
       FROM chats ch
       JOIN chat_participants cp ON cp.chat_id = ch.id AND cp.user_id = ?
  LEFT JOIN messages ms ON ms.chat_id = ch.id
   GROUP BY ch.id
   ORDER BY (MAX(ms.created_at) IS NULL) ASC, last_ts DESC, ch.id DESC
   LIMIT 3`,
    [userId]
  )

  return c.json({
    stats: {
      activeJobs: Number(jobsCount) || 0,
      totalSpent: 0,
      activeProposals: Number(proposalsCount) || 0,
      avgResponseHours: 0,
      messagesCount: Number(messagesCount) || 0,
    },
    recentJobs: recentJobs as any[],
    recentMessages: (recentMsgs as any[]).map((r) => ({ chatId: r.id, lastMessage: r.lastMessage ?? '', time: r.last_ts }))
  })
})


