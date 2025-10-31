import type { Context, Next } from 'hono'
import { jwtVerify } from 'jose'

export type AuthPayload = {
  sub: string
  email: string
  role?: 'client' | 'freelancer'
}

export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    c.set('user', payload as AuthPayload)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

export function getUser(c: Context): AuthPayload | null {
  return (c.get('user') as AuthPayload | undefined) ?? null
}


