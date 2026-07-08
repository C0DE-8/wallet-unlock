import Layout from '../../components/layout/Layout.jsx'
import styles from '../../components/layout/Layout.module.css'

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

export default Recover
