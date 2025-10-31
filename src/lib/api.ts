const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8787/api'

let authToken: string | null = (typeof window !== 'undefined' && localStorage.getItem('token')) || null

export function setAuthToken(token: string | null) {
  authToken = token
  if (typeof window !== 'undefined') {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options.headers || {}),
  }
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

// Auth
export async function apiRegister(params: { email: string; password: string; name?: string; role?: 'client' | 'freelancer' }) {
  return request<{ id: number; email: string; name: string | null; role: string }>(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function apiLogin(params: { email: string; password: string; role?: 'client' | 'freelancer' }) {
  return request<{ token: string; user: { id: number; email: string; name?: string | null; role?: string } }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function apiMe() {
  return request<{ user: { id: string | number; email: string; name?: string | null; role?: string } | null }>(`/auth/me`)
}

// Jobs
export async function apiGetJobs() {
  return request<{ jobs: Array<{ id: number; title: string; budget: number; description: string }> }>(`/jobs`)
}

export async function apiGetJobById(id: number) {
  return request<{ job: { id: number; title: string; budget: number; description: string; created_at?: string } }>(`/jobs/${id}`)
}

export async function apiCreateJob(params: { title: string; budget: number; description: string }) {
  return request<{ job: { id: number; title: string; budget: number; description: string } }>(`/jobs`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function apiEditJob(id: number, params: { title: string; budget: number; description: string }) {
  return request<{ ok: boolean }>(`/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  });
}

export async function apiDeleteJob(id: number) {
  return request<{ ok: boolean }>(`/jobs/${id}`, { method: 'DELETE' });
}

// Chats
export async function apiGetChats() {
  return request<{ chats: Array<{ id: number; participantIds: string[]; lastMessage: string; updatedAt: number }> }>(`/chats`)
}

export async function apiGetMessages(chatId: number) {
  return request<{ messages: Array<{ id: number; chatId: number; senderId: string; text: string; createdAt: number }> }>(`/chats/${chatId}/messages`)
}

export async function apiSendMessage(chatId: number, text: string) {
  return request<{ message: { id: number; chatId: number; senderId: string; text: string; createdAt: number } }>(`/chats/${chatId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}

// Client overview and jobs
export async function apiGetClientOverview() {
  return request<{ stats: { activeJobs: number; totalSpent: number; activeProposals: number; avgResponseHours: number; messagesCount: number }, recentJobs: any[], recentMessages: any[] }>(`/overview/me`)
}

export async function apiGetMyJobs() {
  return request<{ jobs: any[] }>(`/jobs/mine/list`)
}

export async function apiGetPublicJobs() {
  return request<{ jobs: Array<{ id: number; title: string; budget: number; description: string; created_at: string }> }>(`/jobs/public`)
}

export async function apiGetMyProposals() {
  return request<{ proposals: Array<any> }>(`/jobs/proposals/my`)
}

export async function apiGetJobProposals(jobId: number) {
  return request<{ proposals: Array<any> }>(`/jobs/${jobId}/proposals`)
}

export async function apiPostProposal(jobId: number, data: { coverLetter: string, expectedRate: string, timeline: string, additionalDetails: string }) {
  return request<{ proposalId: number }>(`/jobs/${jobId}/proposals`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function apiAcceptProposal(proposalId: number) {
  return request<{ ok: boolean }>(`/jobs/proposals/${proposalId}/accept`, {
    method: 'PATCH',
  })
}

export async function apiRejectProposal(proposalId: number) {
  return request<{ ok: boolean }>(`/jobs/proposals/${proposalId}/reject`, {
    method: 'PATCH',
  })
}


