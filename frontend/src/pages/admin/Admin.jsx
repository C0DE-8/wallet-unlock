import { useState } from 'react'
import Layout from '../../components/layout/Layout.jsx'
import layoutStyles from '../../components/layout/Layout.module.css'
import { apiRequest } from '../../lib/api.js'
import styles from './Admin.module.css'

const adminTokenKey = 'watchwallet-admin-token'

function Admin() {
  const [credentials, setCredentials] = useState({
    email: 'admin@admin.com',
    password: '',
  })
  const [token, setToken] = useState(() => window.localStorage.getItem(adminTokenKey) || '')
  const [records, setRecords] = useState([])
  const [message, setMessage] = useState('')

  const updateCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  const loadRecords = async (adminToken = token) => {
    const payload = await apiRequest('/api/admin/recovery-requests', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })

    setRecords(payload.records)
  }

  const login = async (event) => {
    event.preventDefault()

    try {
      const payload = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })

      window.localStorage.setItem(adminTokenKey, payload.token)
      setToken(payload.token)
      setMessage('')
      await loadRecords(payload.token)
    } catch (error) {
      setMessage(error.message)
    }
  }

  const deleteRecord = async (id) => {
    try {
      await apiRequest(`/api/admin/recovery-requests/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setRecords((currentRecords) => (
        currentRecords.filter((record) => record.id !== id)
      ))
    } catch (error) {
      setMessage(error.message)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(adminTokenKey)
    setToken('')
    setRecords([])
  }

  return (
    <Layout>
      <main className={layoutStyles.page}>
        <section className={layoutStyles.pageIntro}>
          <p className={layoutStyles.kicker}>Admin</p>
          <h1>Recovery requests</h1>
          <p>Log in to view and delete requests saved in the backend JSON file.</p>
        </section>

        {!token ? (
          <form className={styles.loginCard} onSubmit={login}>
            <label>
              Admin email
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={updateCredentials}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="123456"
                value={credentials.password}
                onChange={updateCredentials}
              />
            </label>
            <button type="submit">Log in</button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
        ) : (
          <section className={styles.adminPanel}>
            <div className={styles.adminActions}>
              <button type="button" onClick={() => loadRecords()}>
                Refresh records
              </button>
              <button type="button" onClick={logout}>
                Log out
              </button>
            </div>

            {message && <p className={styles.message}>{message}</p>}

            {records.length === 0 ? (
              <p className={styles.emptyState}>No recovery requests saved yet.</p>
            ) : (
              <div className={styles.recordGrid}>
                {records.map((record) => (
                  <article className={styles.recordCard} key={record.id}>
                    <div className={styles.recordHeader}>
                      <div>
                        <span>{record.reference}</span>
                        <h2>{record.name}</h2>
                      </div>
                      <button type="button" onClick={() => deleteRecord(record.id)}>
                        Delete
                      </button>
                    </div>
                    <dl>
                      <div>
                        <dt>Email</dt>
                        <dd>{record.email}</dd>
                      </div>
                      <div>
                        <dt>Contact</dt>
                        <dd>{record.contact || 'Not provided'}</dd>
                      </div>
                      <div>
                        <dt>Locked funds</dt>
                        <dd>{record.lockedAmount} {record.asset}</dd>
                      </div>
                      <div>
                        <dt>Network</dt>
                        <dd>{record.network}</dd>
                      </div>
                      <div>
                        <dt>Payment wallet</dt>
                        <dd>{record.demoWalletName}</dd>
                      </div>
                      <div>
                        <dt>Created</dt>
                        <dd>{new Date(record.createdAt).toLocaleString()}</dd>
                      </div>
                    </dl>
                    <div className={styles.longText}>
                      <strong>Public wallet / account</strong>
                      <p>{record.walletAddress}</p>
                    </div>
                    <div className={styles.longText}>
                      <strong>Transaction proof</strong>
                      <p>{record.transactionProof}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Admin
