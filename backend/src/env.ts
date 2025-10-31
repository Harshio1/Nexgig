import { config } from 'dotenv'
import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 chars'),
})

export type Env = z.infer<typeof EnvSchema>

export function loadEnv(): Env {
  config()
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Environment validation failed')
  }
  return parsed.data
}


