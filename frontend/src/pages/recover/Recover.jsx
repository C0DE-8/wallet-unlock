import Layout from '../../components/layout/Layout.jsx'
import layoutStyles from '../../components/layout/Layout.module.css'
import styles from './Recover.module.css'

const paymentWallets = [
  'Bitcoin wallet',
  'Ethereum wallet',
  'BNB Smart Chain wallet',
  'Solana wallet',
  'Tron / USDT wallet',
  'Invoice by card or bank',
]

const lockedLocations = [
  'Watch-only wallet',
  'Exchange account',
  'Bridge transaction',
  'Staking or DeFi app',
  'Scam destination address',
  'Unknown location',
]

const cryptoFeeNotes = [
  {
    coin: 'BTC',
    title: 'Bitcoin',
    note: 'Best for large transfers. Network fees change with mempool demand and confirmation speed.',
  },
  {
    coin: 'ETH',
    title: 'Ethereum',
    note: 'Uses gas fees. Always confirm the chain is Ethereum mainnet before sending.',
  },
  {
    coin: 'USDT',
    title: 'Stablecoin',
    note: 'Useful for fixed-value invoices. USDT exists on multiple chains, so network selection matters.',
  },
  {
    coin: 'SOL',
    title: 'Solana',
    note: 'Often fast with low network fees, but only send to a Solana-compatible invoice address.',
  },
]

function Recover() {
  return (
    <Layout>
      <main className={layoutStyles.page}>
        <section className={layoutStyles.pageIntro}>
          <p className={layoutStyles.kicker}>Recovery request</p>
          <h1>Start your recovery and payment review.</h1>
          <p>
            Tell us where the funds are locked, how you prefer to pay if the
            case is approved, and the public transaction details needed for a
            written review. Do not submit secret wallet information.
          </p>
        </section>

        <section className={styles.flowHeader}>
          <article>
            <span>1</span>
            <strong>Case details</strong>
            <p>Share only public wallet and transaction information.</p>
          </article>
          <article>
            <span>2</span>
            <strong>Payment preference</strong>
            <p>Select the wallet or payment route you want on the invoice.</p>
          </article>
          <article>
            <span>3</span>
            <strong>Written approval</strong>
            <p>Receive the scope and invoice before sending any payment.</p>
          </article>
        </section>

        <form className={styles.recoveryForm}>
          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <p className={layoutStyles.kicker}>Your contact</p>
              <h2>How should we reply?</h2>
            </div>
            <div className={styles.fieldGrid}>
              <label>
                Full name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email address
                <input type="email" name="email" placeholder="you@example.com" />
              </label>
              <label>
                Telegram or phone
                <input type="text" name="contact" placeholder="Optional contact method" />
              </label>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <p className={layoutStyles.kicker}>Locked funds</p>
              <h2>Where are the funds you want to access?</h2>
            </div>
            <div className={styles.fieldGrid}>
              <label>
                Locked location
                <select name="lockedLocation" defaultValue="">
                  <option value="" disabled>
                    Select where the funds are locked
                  </option>
                  {lockedLocations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
              </label>
              <label>
                Asset or token
                <input type="text" name="asset" placeholder="Example: BTC, ETH, USDT" />
              </label>
              <label>
                Network
                <select name="network" defaultValue="">
                  <option value="" disabled>
                    Select a network
                  </option>
                  <option>Bitcoin</option>
                  <option>Ethereum</option>
                  <option>BNB Smart Chain</option>
                  <option>Solana</option>
                  <option>Tron</option>
                  <option>Polygon</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Estimated locked amount
                <input type="text" name="lockedAmount" placeholder="Example: 0.25 BTC or 4,000 USDT" />
              </label>
              <label className={styles.wideField}>
                Public wallet address or account reference
                <input type="text" name="walletAddress" placeholder="Public wallet address, exchange case ID, or platform username" />
              </label>
              <label className={styles.wideField}>
                Transaction hash or public proof
                <textarea
                  name="transactionProof"
                  rows="4"
                  placeholder="Paste public transaction hashes, explorer links, dates, and the platform involved"
                ></textarea>
              </label>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <p className={layoutStyles.kicker}>Payment plan</p>
              <h2>Choose how you want to pay after approval.</h2>
              <p>
                The receiving wallet or invoice address is provided only after
                the case is reviewed and scoped. Verify the invoice details
                before sending payment.
              </p>
            </div>
            <div className={styles.paymentGrid}>
              {paymentWallets.map((wallet) => (
                <label className={styles.paymentOption} key={wallet}>
                  <input type="radio" name="paymentWallet" value={wallet} />
                  <span>{wallet}</span>
                </label>
              ))}
            </div>
            <div className={styles.fieldGrid}>
              <label>
                Paying from wallet address
                <input type="text" name="payingFrom" placeholder="Optional public sender wallet" />
              </label>
              <label>
                Preferred payment asset
                <input type="text" name="paymentAsset" placeholder="Example: BTC, ETH, USDT, USD" />
              </label>
              <label>
                Fee speed preference
                <select name="feeSpeed" defaultValue="">
                  <option value="" disabled>
                    Select a speed
                  </option>
                  <option>Standard network fee</option>
                  <option>Priority network fee</option>
                  <option>Lowest available fee</option>
                  <option>Invoice by card or bank</option>
                </select>
              </label>
              <label>
                Service fee estimate
                <input
                  type="text"
                  value="Quoted after review"
                  readOnly
                />
              </label>
              <label className={styles.wideField}>
                Invoice wallet destination
                <input
                  type="text"
                  value="Assigned after review and written approval"
                  readOnly
                />
              </label>
            </div>
          </section>

          <section className={styles.feeSection}>
            <div className={styles.sectionTitle}>
              <p className={layoutStyles.kicker}>Crypto fee guide</p>
              <h2>Know the difference between coin fees and service fees.</h2>
              <p>
                A blockchain network fee is paid to miners or validators when a
                transaction is broadcast. A service fee is only charged if your
                recovery case is reviewed, scoped, and approved in writing.
              </p>
            </div>
            <div className={styles.feeGrid}>
              {cryptoFeeNotes.map((item) => (
                <article key={item.coin}>
                  <span>{item.coin}</span>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
            <div className={styles.feeSummary}>
              <div>
                <strong>Network fee</strong>
                <p>Paid on-chain and varies by coin, chain traffic, and speed.</p>
              </div>
              <div>
                <strong>Review fee</strong>
                <p>Shown on the invoice only after your case details are checked.</p>
              </div>
              <div>
                <strong>Wrong-chain risk</strong>
                <p>Sending USDT or other tokens to the wrong network can cause loss.</p>
              </div>
            </div>
          </section>

          <section className={styles.warningBox}>
            <strong>Before you submit</strong>
            <p>
              Never enter seed phrases, private keys, wallet passwords, remote
              access codes, 2FA codes, or screenshots of secret backup words.
              This form is for public case details and payment preference only.
            </p>
          </section>

          <button className={styles.submitButton} type="button">
            Request review and invoice details
          </button>
        </form>
      </main>
    </Layout>
  )
}

export default Recover
