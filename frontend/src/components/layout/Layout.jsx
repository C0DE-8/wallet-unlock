import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

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

export default Layout
