import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRouter } from './routes/auth'
import { jobsRouter } from './routes/jobs'
import { chatsRouter } from './routes/chats'
import { loadEnv } from './env'
import { ensureSchema, getPool } from './db'
import { overviewRouter } from './routes/overview'

loadEnv()

const app = new Hono().basePath('/api')

app.use('*', cors({
  origin: (origin) => origin ?? '*',
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

console.log(`Nexgig API listening on http://localhost:${port}`)

export default {
  fetch: app.fetch,
  port,
}


