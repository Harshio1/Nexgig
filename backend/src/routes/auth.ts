import { Hono } from 'hono'
import { z } from 'zod'
import { getPool, ensureSchema } from '../db'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import type { AuthPayload } from '../middleware/auth'

export const authRouter = new Hono()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  name: z.string().optional(),
  role: z.enum(['client', 'freelancer']).optional(),
})

authRouter.post('/register', async (c) => {
  await ensureSchema()
  const body = await c.req.json()
  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)
  const { email, password, name, role } = parsed.data
  const pool = getPool()
  const hash = await bcrypt.hash(password, 10)
  try {
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [email, hash, name ?? null, role ?? 'freelancer']
    )
    return c.json({ id: (result as any).insertId, email, name: name ?? null, role: role ?? 'freelancer' })
  } catch (e: any) {
    console.error('Registration error:', e);
    if (e && e.code === 'ER_DUP_ENTRY') {
      // This should only happen if the email+role combination already exists
      // Since we have a composite unique key on (email, role), 
      // the same email for different roles should be allowed
      return c.json({ error: `Email already registered for ${role ?? 'freelancer'} role.` }, 409)
    }
    return c.json({ error: 'Failed to register' }, 500)
  }
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  role: z.enum(['client', 'freelancer']).optional(), // Add role to login schema
})

authRouter.post('/login', async (c) => {
  const body = await c.req.json()
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)
  const { email, password, role } = parsed.data
  const pool = getPool()
  
  let query = 'SELECT id, email, password_hash, name, role FROM users WHERE email = ?'
  const params: any[] = [email]
  
  // If role is provided, filter by role as well
  if (role) {
    query += ' AND role = ?'
    params.push(role)
  }
  
  const [rows] = await pool.query(query, params)
  const users = Array.isArray(rows) ? (rows as any[]) : []
  
  // If no users found
  if (users.length === 0) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }
  
  // If role was not specified and multiple accounts exist, return an error
  if (!role && users.length > 1) {
    return c.json({ 
      error: 'Multiple accounts found. Please specify role.',
      accounts: users.map(u => ({ role: u.role }))
    }, 409)
  }
  
  // Get the user (either the only one or the one matching the specified role)
  const user = users[0]
  
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return c.json({ error: 'Invalid credentials' }, 401)

  const payload: AuthPayload = { sub: String(user.id), email: user.email, role: user.role }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret)

  return c.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})

authRouter.get('/me', async (c) => {
  // Lightweight profile access via token only; frontend attaches Authorization header
  const auth = c.req.header('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token) return c.json({ user: null })
  try {
    // decrypt in middleware is nicer, but keep /me dependency-free
    const { jwtVerify } = await import('jose')
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    // Fetch user details from database to get name
    const pool = getPool()
    const [rows] = await pool.query('SELECT id, email, name, role FROM users WHERE id = ?', [payload.sub])
    const user = Array.isArray(rows) && rows.length ? (rows as any)[0] : null
    if (!user) return c.json({ user: null })
    return c.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch {
    return c.json({ user: null })
  }
})


