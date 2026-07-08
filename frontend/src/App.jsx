import { useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Home from './pages/home/Home.jsx'

const safetyRules = [
  'Never share your seed phrase, private key, password, or one-time code.',
  'No legitimate review requires remote access to your device.',
  'Crypto transfers cannot be guaranteed reversible after confirmation.',
  'Only pay against a written scope and invoice from a verified contact.',
]

function CookieBanner() {
  const [status, setStatus] = useState(() => (
    window.localStorage.getItem('watchwallet-cookies') || 'pending'
  ))
  const [showPreferences, setShowPreferences] = useState(false)

  const saveChoice = (choice) => {
    window.localStorage.setItem('watchwallet-cookies', choice)
    setStatus(choice)
  }

  if (status !== 'pending') {
    return null
  }

  return (
    <section className={styles.cookieBanner} aria-label="Cookie notice">
      <div>
        <strong>Cookie notice</strong>
        <p>
          We use necessary cookies to keep the site reliable and secure. With
          your permission, we may also use analytics cookies to understand page
          performance and improve the recovery request experience.
        </p>
        {showPreferences && (
          <div className={styles.cookiePreferences}>
            <label>
              <input type="checkbox" checked readOnly />
              Strictly necessary cookies
            </label>
            <label>
              <input type="checkbox" />
              Analytics and improvement cookies
            </label>
          </div>
        )}
      </div>
      <div className={styles.cookieActions}>
        <button type="button" onClick={() => setShowPreferences((value) => !value)}>
          Cookie preferences
        </button>
        <button type="button" onClick={() => saveChoice('rejected')}>
          Reject additional cookies
        </button>
        <button type="button" onClick={() => saveChoice('accepted')}>
          Accept cookies and continue
        </button>
      </div>
    </section>
  )
}

function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} to="/" aria-label="WatchWallet home">
          <span className={styles.brandMark}>W</span>
          <span>WatchWallet</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recover">Recover</NavLink>
          <NavLink to="/security">Security</NavLink>
        </nav>

        <Link className={styles.headerCta} to="/recover">
          Start review
        </Link>
      </header>

      {children}

      <footer className={styles.footer}>
        <div>
          <strong>WatchWallet</strong>
          <p>Professional, non-custodial wallet incident review.</p>
        </div>
        <div className={styles.footerLinks}>
          <Link to="/recover">Recovery request</Link>
          <Link to="/security">Security rules</Link>
        </div>
      </footer>

      <CookieBanner />
    </div>
  )
}

function Recover() {
  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.pageIntro}>
          <p className={styles.kicker}>Recovery request</p>
          <h1>Start with a secure case review.</h1>
          <p>
            Enter public information only. A specialist can review the case and
            send a written scope before any payment option is discussed.
          </p>
        </section>

        <form className={styles.form}>
          <label>
            Full name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email address
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Wallet network
            <select name="network" defaultValue="">
              <option value="" disabled>
                Select a network
              </option>
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>BNB Smart Chain</option>
              <option>Solana</option>
              <option>Tron</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Public transaction details
            <textarea
              name="details"
              rows="6"
              placeholder="Public wallet address, transaction hash, date, platform, and what happened"
            ></textarea>
          </label>
          <button type="button">Submit review request</button>
          <p className={styles.formNote}>
            Do not submit seed phrases, private keys, passwords, screenshots of
            secret backup words, or 2FA codes.
          </p>
        </form>
      </main>
    </Layout>
  )
}

function Security() {
  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.pageIntro}>
          <p className={styles.kicker}>Security first</p>
          <h1>Know the rules before you ask for help.</h1>
          <p>
            Recovery scams often ask users to send crypto first or reveal wallet
            secrets. WatchWallet uses a review-first process and never takes
            custody of your wallet.
          </p>
        </section>

        <section className={styles.ruleGrid}>
          {safetyRules.map((rule) => (
            <article key={rule}>
              <span aria-hidden="true">✓</span>
              <p>{rule}</p>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  )
}

function NotFound() {
  return (
    <Layout>
      <main className={styles.notFound}>
        <p className={styles.kicker}>404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className={styles.headerCta} to="/">
          Go home
        </Link>
      </main>
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home Layout={Layout} />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/security" element={<Security />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
