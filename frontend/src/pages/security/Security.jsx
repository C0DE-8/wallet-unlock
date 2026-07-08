import Layout from '../../components/layout/Layout.jsx'
import styles from '../../components/layout/Layout.module.css'

const safetyRules = [
  'Never share your seed phrase, private key, password, or one-time code.',
  'No legitimate review requires remote access to your device.',
  'Crypto transfers cannot be guaranteed reversible after confirmation.',
  'Only pay against a written scope and invoice from a verified contact.',
]

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

export default Security
