import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { authRouter } from './routes/auth'
import { jobsRouter } from './routes/jobs'
import { chatsRouter } from './routes/chats'
import { overviewRouter } from './routes/overview'

import { loadEnv } from './env'
import { ensureSchema, getPool } from './db'

loadEnv()

const app = new Hono().basePath('/api')

app.use('*', cors({
  origin: (origin) => {
    const allowed = [
      'http://localhost:8080',
      'https://nexgig-lime.vercel.app'
    ]
    if (!origin) return allowed[0]
    
    // Allow any Vercel preview link for this project
    if (origin.endsWith('.vercel.app') && origin.includes('nexgig')) {
      return origin
    }
    
    if (allowed.includes(origin)) return origin
    return allowed[1]
  },
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  maxAge: 86400,
}))

app.route('/auth', authRouter)
app.route('/jobs', jobsRouter)
app.route('/chats', chatsRouter)
app.route('/overview', overviewRouter)

const port = Number(process.env.PORT ?? 8787)

// Attempt DB connection and schema init on startup
ensureSchema()
  .then(async () => {
    await getPool().query('SELECT 1')
    console.log('Database connected and schema ensured')
  })
  .catch((err) => {
    console.error('Database initialization failed:', err?.message || err)
  })

// Start server
export default {
  port: port,
  fetch: app.fetch,
}

console.log(`Nexgig API listening on port ${port}`)
