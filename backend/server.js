const { createServer } = require('node:http')
const { readFile, writeFile, mkdir } = require('node:fs/promises')
const { join } = require('node:path')
const { randomUUID } = require('node:crypto')

const port = Number(process.env.PORT || 8787)
const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com'
const adminPassword = process.env.ADMIN_PASSWORD || '123456'
const adminToken = Buffer.from(`${adminEmail}:${adminPassword}`).toString('base64')
const dataDirectory = join(__dirname, 'data')
const dataFile = join(dataDirectory, 'recovery-requests.json')

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(payload))
}

async function readJsonBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  if (!chunks.length) {
    return {}
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

async function readRequests() {
  await mkdir(dataDirectory, { recursive: true })

  try {
    return JSON.parse(await readFile(dataFile, 'utf8'))
  } catch {
    await writeFile(dataFile, '[]')
    return []
  }
}

async function writeRequests(requests) {
  await mkdir(dataDirectory, { recursive: true })
  await writeFile(dataFile, `${JSON.stringify(requests, null, 2)}\n`)
}

function isAdmin(request) {
  return request.headers.authorization === `Bearer ${adminToken}`
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  try {
    if (request.method === 'POST' && url.pathname === '/api/recovery-requests') {
      const body = await readJsonBody(request)
      const requests = await readRequests()
      const record = {
        ...body,
        id: randomUUID(),
        status: 'new',
        createdAt: new Date().toISOString(),
      }

      requests.unshift(record)
      await writeRequests(requests)
      sendJson(response, 201, { ok: true, record })
      return
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/login') {
      const body = await readJsonBody(request)

      if (body.email !== adminEmail || body.password !== adminPassword) {
        sendJson(response, 401, { ok: false, message: 'Invalid admin login' })
        return
      }

      sendJson(response, 200, { ok: true, token: adminToken })
      return
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/recovery-requests') {
      if (!isAdmin(request)) {
        sendJson(response, 401, { ok: false, message: 'Unauthorized' })
        return
      }

      sendJson(response, 200, { ok: true, records: await readRequests() })
      return
    }

    if (request.method === 'DELETE' && url.pathname.startsWith('/api/admin/recovery-requests/')) {
      if (!isAdmin(request)) {
        sendJson(response, 401, { ok: false, message: 'Unauthorized' })
        return
      }

      const id = decodeURIComponent(url.pathname.split('/').at(-1))
      const requests = await readRequests()
      const nextRequests = requests.filter((record) => record.id !== id)

      if (nextRequests.length === requests.length) {
        sendJson(response, 404, { ok: false, message: 'Record not found' })
        return
      }

      await writeRequests(nextRequests)
      sendJson(response, 200, { ok: true })
      return
    }

    sendJson(response, 404, { ok: false, message: 'Not found' })
  } catch (error) {
    sendJson(response, 500, { ok: false, message: error.message })
  }
}).listen(port, () => {
  console.log(`WatchWallet API running on http://localhost:${port}`)
})
