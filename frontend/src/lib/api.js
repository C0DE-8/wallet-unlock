export const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed')
  }

  return payload
}
