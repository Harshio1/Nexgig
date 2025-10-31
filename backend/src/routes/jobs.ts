import { Hono } from 'hono'
import { z } from 'zod'
import { getUser, authMiddleware } from '../middleware/auth'
import { getPool } from '../db'

export const jobsRouter = new Hono()

const createJobSchema = z.object({
  title: z.string().min(1),
  budget: z.number().int().nonnegative(),
  description: z.string().min(1),
})

// List all jobs, public feed for freelancers (GET /jobs/public)
jobsRouter.get('/public', async (c) => {
  try {
    // First, let's log the total count of jobs for debugging
    const [countResult]: any = await getPool().query('SELECT COUNT(*) as total FROM jobs');
    console.log('Total jobs in database:', countResult[0].total);
    
    // Then log jobs with client_id for debugging
    const [clientJobsResult]: any = await getPool().query('SELECT COUNT(*) as total FROM jobs WHERE client_id IS NOT NULL');
    console.log('Jobs with client_id:', clientJobsResult[0].total);
    
    const [rows]: any = await getPool().query(
      `SELECT id, title, budget, description, created_at, client_id FROM jobs WHERE client_id IS NOT NULL ORDER BY id DESC`
    )
    console.log('Public jobs being returned:', rows.length);
    return c.json({ jobs: rows as any[] })
  } catch (error) {
    console.error('Error fetching public jobs:', error)
    return c.json({ error: 'Failed to fetch jobs' }, 500)
  }
})

jobsRouter.get('/', async (c) => {
  const [rows] = await getPool().query(
    'SELECT id, title, budget, description, created_at FROM jobs ORDER BY id DESC'
  )
  return c.json({ jobs: rows as any[] })
})

jobsRouter.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  // Validate that id is a valid number
  if (isNaN(id)) return c.json({ error: 'Invalid job ID' }, 400)
  const [rows] = await getPool().query('SELECT id, title, budget, description, created_at FROM jobs WHERE id = ?', [id])
  const job = Array.isArray(rows) && rows.length ? (rows as any)[0] : null
  if (!job) return c.json({ error: 'Not found' }, 404)
  return c.json({ job })
})

// Get jobs owned by the authenticated client
jobsRouter.get('/mine/list', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const [rows] = await getPool().query(
    `SELECT j.id, j.title, j.budget, j.description, j.created_at, 
            COUNT(p.id) as proposal_count
       FROM jobs j
       LEFT JOIN proposals p ON j.id = p.job_id
      WHERE j.client_id = ?
      GROUP BY j.id, j.title, j.budget, j.description, j.created_at
      ORDER BY j.id DESC`,
    [Number(user.sub)]
  )
  return c.json({ jobs: rows as any[] })
})

jobsRouter.post('/', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const body = await c.req.json()
  const parsed = createJobSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)
  const { title, budget, description } = parsed.data
  try {
    const [result] = await getPool().query(
      'INSERT INTO jobs (title, budget, description, client_id) VALUES (?, ?, ?, ?)',
      [title, budget, description, Number(user.sub)]
    )
    return c.json({ job: { id: (result as any).insertId, title, budget, description } }, 201)
  } catch (error) {
    console.error('Error creating job:', error)
    return c.json({ error: 'Failed to create job' }, 500)
  }
})

// Edit job (PATCH /jobs/:id)
jobsRouter.patch('/:id', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const id = Number(c.req.param('id'))
  // Validate that id is a valid number
  if (isNaN(id)) return c.json({ error: 'Invalid job ID' }, 400)
  const body = await c.req.json()
  // Only allow updating title, budget, and description
  const schema = z.object({ title: z.string().min(1), budget: z.number().int().nonnegative(), description: z.string().min(1) })
  const parsed = schema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)
  // Ensure only the owner client can update
  const [rows] = await getPool().query('SELECT client_id FROM jobs WHERE id = ?', [id])
  const job = Array.isArray(rows) && rows.length ? (rows as any)[0] : null
  if (!job || Number(job.client_id) !== Number(user.sub)) return c.json({ error: 'Forbidden' }, 403)
  await getPool().query('UPDATE jobs SET title = ?, budget = ?, description = ? WHERE id = ?', [parsed.data.title, parsed.data.budget, parsed.data.description, id])
  return c.json({ ok: true })
})

// Delete job (DELETE /jobs/:id)
jobsRouter.delete('/:id', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const id = Number(c.req.param('id'))
  // Validate that id is a valid number
  if (isNaN(id)) return c.json({ error: 'Invalid job ID' }, 400)
  // Only the owning client can delete
  const [rows] = await getPool().query('SELECT client_id FROM jobs WHERE id = ?', [id])
  const job = Array.isArray(rows) && rows.length ? (rows as any)[0] : null
  if (!job || Number(job.client_id) !== Number(user.sub)) return c.json({ error: 'Forbidden' }, 403)
  await getPool().query('DELETE FROM jobs WHERE id = ?', [id])
  return c.json({ ok: true })
})

// List all jobs, public feed for freelancers (GET /jobs/public)
jobsRouter.get('/public', async (c) => {
  try {
    // First, let's log the total count of jobs for debugging
    const [countResult]: any = await getPool().query('SELECT COUNT(*) as total FROM jobs');
    console.log('Total jobs in database:', countResult[0].total);
    
    // Then log jobs with client_id for debugging
    const [clientJobsResult]: any = await getPool().query('SELECT COUNT(*) as total FROM jobs WHERE client_id IS NOT NULL');
    console.log('Jobs with client_id:', clientJobsResult[0].total);
    
    const [rows]: any = await getPool().query(
      `SELECT id, title, budget, description, created_at, client_id FROM jobs WHERE client_id IS NOT NULL ORDER BY id DESC`
    )
    console.log('Public jobs being returned:', rows.length);
    return c.json({ jobs: rows as any[] })
  } catch (error) {
    console.error('Error fetching public jobs:', error)
    return c.json({ error: 'Failed to fetch jobs' }, 500)
  }
})

// List proposals submitted by the authenticated freelancer (GET /jobs/proposals/my)
jobsRouter.get('/proposals/my', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'freelancer') return c.json({ error: 'Forbidden' }, 403)
  const [rows] = await getPool().query(
    `SELECT p.id, p.job_id, p.cover_letter, p.expected_rate, p.timeline, p.additional_details, p.status, p.submitted_at,
            j.title, j.budget, j.description
       FROM proposals p
       JOIN jobs j ON p.job_id = j.id
      WHERE p.freelancer_id = ?
      ORDER BY p.submitted_at DESC`,
    [Number(user.sub)]
  )
  return c.json({ proposals: rows as any[] })
})

// List proposals for a job owned by the authenticated client (GET /jobs/:id/proposals)
jobsRouter.get('/:id/proposals', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const jobId = Number(c.req.param('id'))
  // Validate that jobId is a valid number
  if (isNaN(jobId)) return c.json({ error: 'Invalid job ID' }, 400)
  // Ensure only the owner client can view proposals
  const [jobRows] = await getPool().query('SELECT client_id FROM jobs WHERE id = ?', [jobId])
  const job = Array.isArray(jobRows) && jobRows.length ? (jobRows as any)[0] : null
  if (!job || Number(job.client_id) !== Number(user.sub)) return c.json({ error: 'Forbidden' }, 403)
  // Get proposals for this job
  const [proposalRows] = await getPool().query(
    `SELECT p.id, p.cover_letter, p.expected_rate, p.timeline, p.additional_details, p.status, p.submitted_at,
            u.name as freelancer_name, u.id as freelancer_id
       FROM proposals p
       JOIN users u ON p.freelancer_id = u.id
      WHERE p.job_id = ?
      ORDER BY p.submitted_at DESC`,
    [jobId]
  )
  return c.json({ proposals: proposalRows as any[] })
})

// Post a proposal for a job (POST /jobs/:id/proposals)
jobsRouter.post('/:id/proposals', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'freelancer') return c.json({ error: 'Forbidden' }, 403)
  const jobId = Number(c.req.param('id'))
  // Validate that jobId is a valid number
  if (isNaN(jobId)) return c.json({ error: 'Invalid job ID' }, 400)
  const { coverLetter, expectedRate, timeline, additionalDetails } = await c.req.json()
  // Check for existing proposal to prevent duplicates
  const [existing] = await getPool().query('SELECT id FROM proposals WHERE job_id = ? AND freelancer_id = ?', [jobId, Number(user.sub)])
  if (Array.isArray(existing) && existing.length) {
    return c.json({ error: 'Already applied' }, 409)
  }
  const [res] = await getPool().query(
    'INSERT INTO proposals (job_id, freelancer_id, cover_letter, expected_rate, timeline, additional_details) VALUES (?, ?, ?, ?, ?, ?)',
    [jobId, Number(user.sub), coverLetter ?? '', expectedRate ?? '', timeline ?? '', additionalDetails ?? '']
  )
  return c.json({ proposalId: (res as any).insertId })
})

// Accept a proposal (PATCH /jobs/proposals/:id/accept)
jobsRouter.patch('/proposals/:id/accept', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const proposalId = Number(c.req.param('id'))
  // Validate that proposalId is a valid number
  if (isNaN(proposalId)) return c.json({ error: 'Invalid proposal ID' }, 400)
  // Get proposal details to check ownership
  const [proposalRows] = await getPool().query(
    `SELECT p.id, j.client_id
       FROM proposals p
       JOIN jobs j ON p.job_id = j.id
      WHERE p.id = ?`,
    [proposalId]
  )
  const proposal = Array.isArray(proposalRows) && proposalRows.length ? (proposalRows as any)[0] : null
  if (!proposal) return c.json({ error: 'Proposal not found' }, 404)
  // Ensure only the job owner (client) can accept the proposal
  if (Number(proposal.client_id) !== Number(user.sub)) return c.json({ error: 'Forbidden' }, 403)
  // Update proposal status to accepted
  await getPool().query('UPDATE proposals SET status = ? WHERE id = ?', ['accepted', proposalId])
  // Create assignment record
  const [jobRows] = await getPool().query('SELECT job_id, freelancer_id FROM proposals WHERE id = ?', [proposalId])
  const job = Array.isArray(jobRows) && jobRows.length ? (jobRows as any)[0] : null
  if (job) {
    await getPool().query(
      'INSERT INTO assignments (job_id, freelancer_id) VALUES (?, ?)',
      [job.job_id, job.freelancer_id]
    )
  }
  return c.json({ ok: true })
})

// Reject a proposal (PATCH /jobs/proposals/:id/reject)
jobsRouter.patch('/proposals/:id/reject', authMiddleware, async (c) => {
  const user = getUser(c)
  if (!user || user.role !== 'client') return c.json({ error: 'Forbidden' }, 403)
  const proposalId = Number(c.req.param('id'))
  // Validate that proposalId is a valid number
  if (isNaN(proposalId)) return c.json({ error: 'Invalid proposal ID' }, 400)
  // Get proposal details to check ownership
  const [proposalRows] = await getPool().query(
    `SELECT p.id, j.client_id
       FROM proposals p
       JOIN jobs j ON p.job_id = j.id
      WHERE p.id = ?`,
    [proposalId]
  )
  const proposal = Array.isArray(proposalRows) && proposalRows.length ? (proposalRows as any)[0] : null
  if (!proposal) return c.json({ error: 'Proposal not found' }, 404)
  // Ensure only the job owner (client) can reject the proposal
  if (Number(proposal.client_id) !== Number(user.sub)) return c.json({ error: 'Forbidden' }, 403)
  // Update proposal status to rejected
  await getPool().query('UPDATE proposals SET status = ? WHERE id = ?', ['rejected', proposalId])
  return c.json({ ok: true })
})


