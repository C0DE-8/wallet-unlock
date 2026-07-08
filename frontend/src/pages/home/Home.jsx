import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const stats = [
  ['24h', 'initial review window'],
  ['100%', 'non-custodial process'],
  ['0', 'seed phrases requested'],
]

const assets = ['BTC', 'ETH', 'BNB', 'SOL', 'TRX', 'USDT']

const recoverySteps = [
  'Submit public wallet addresses and transaction hashes.',
  'Receive a written review of what can and cannot be done.',
  'Approve a documented plan before any paid recovery support begins.',
]

function Home({ Layout }) {
  return (
    <Layout>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Self-custody support</p>
            <h1>Clear recovery guidance for wallet incidents.</h1>
            <p className={styles.lede}>
              WatchWallet helps you document suspicious transfers, review
              watch-only wallet issues, and understand legitimate next steps
              without asking for your secret phrase.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} to="/recover">
                Start a secure review
              </Link>
              <Link className={styles.secondaryButton} to="/security">
                See safety rules
              </Link>
            </div>
          </div>

          <div className={styles.phoneStage} aria-label="Wallet status preview">
            <div className={styles.phone}>
              <div className={styles.phoneTop}>
                <span>Watch wallet</span>
                <strong>Review mode</strong>
              </div>
              <div className={styles.balanceCard}>
                <span>Case status</span>
                <strong>Public data only</strong>
              </div>
              <div className={styles.assetList}>
                {assets.map((asset) => (
                  <div key={asset}>
                    <span>{asset}</span>
                    <strong>Trace ready</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.stats} aria-label="Service highlights">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className={styles.featureSection}>
          <div>
            <p className={styles.eyebrow}>Recovery workflow</p>
            <h2>Simple, documented, and non-custodial.</h2>
          </div>
          <div className={styles.featureGrid}>
            {recoverySteps.map((step, index) => (
              <article key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Home
