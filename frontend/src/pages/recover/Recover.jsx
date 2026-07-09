import { useState } from 'react'
import Layout from '../../components/layout/Layout.jsx'
import layoutStyles from '../../components/layout/Layout.module.css'
import { apiRequest } from '../../lib/api.js'
import styles from './Recover.module.css'

const paymentWallets = [
  {
    id: 'btc',
    name: 'Bitcoin wallet',
    asset: 'BTC',
    network: 'Bitcoin',
    demoAddress: 'DEMO_BTC_REVIEW_FEE_WALLET_DO_NOT_SEND',
  },
  {
    id: 'eth',
    name: 'Ethereum wallet',
    asset: 'ETH / USDT',
    network: 'Ethereum ERC-20',
    demoAddress: 'DEMO_ETH_REVIEW_FEE_WALLET_DO_NOT_SEND',
  },
  {
    id: 'bnb',
    name: 'BNB Smart Chain wallet',
    asset: 'BNB / USDT',
    network: 'BEP-20',
    demoAddress: 'DEMO_BNB_REVIEW_FEE_WALLET_DO_NOT_SEND',
  },
  {
    id: 'sol',
    name: 'Solana wallet',
    asset: 'SOL / USDC',
    network: 'Solana',
    demoAddress: 'DEMO_SOL_REVIEW_FEE_WALLET_DO_NOT_SEND',
  },
  {
    id: 'tron',
    name: 'Tron USDT wallet',
    asset: 'USDT',
    network: 'TRC-20',
    demoAddress: 'DEMO_TRON_USDT_REVIEW_FEE_WALLET_DO_NOT_SEND',
  },
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

const initialFormData = {
  name: '',
  email: '',
  contact: '',
  lockedLocation: '',
  asset: '',
  network: '',
  lockedAmount: '',
  walletAddress: '',
  transactionProof: '',
  paymentWallet: '',
  payingFrom: '',
  paymentAsset: '',
  feeSpeed: '',
}

const storageKey = 'watchwallet-recovery-form'
const submissionStorageKey = 'watchwallet-recovery-submission'

function Recover() {
  const [formData, setFormData] = useState(() => {
    const savedData = window.localStorage.getItem(storageKey)

    if (!savedData) {
      return initialFormData
    }

    try {
      return { ...initialFormData, ...JSON.parse(savedData) }
    } catch {
      return initialFormData
    }
  })
  const [submission, setSubmission] = useState(() => {
    const savedSubmission = window.localStorage.getItem(submissionStorageKey)

    if (!savedSubmission) {
      return null
    }

    try {
      return JSON.parse(savedSubmission)
    } catch {
      return null
    }
  })
  const [error, setError] = useState('')

  const selectedWallet = paymentWallets.find((wallet) => (
    wallet.id === formData.paymentWallet
  ))

  const updateFormData = (event) => {
    const { name, value } = event.target
    const nextData = { ...formData, [name]: value }

    setFormData(nextData)
    window.localStorage.setItem(storageKey, JSON.stringify(nextData))
  }

  const submitRecoveryRequest = async (event) => {
    event.preventDefault()

    const requiredFields = [
      'name',
      'email',
      'lockedLocation',
      'asset',
      'network',
      'lockedAmount',
      'walletAddress',
      'transactionProof',
      'paymentWallet',
    ]
    const missingField = requiredFields.find((field) => !formData[field].trim())

    if (missingField) {
      setError('Please complete the required case and payment fields before submitting.')
      return
    }

    const nextSubmission = {
      ...formData,
      reviewFee: '$49 demo review fee',
      demoWalletName: selectedWallet?.name,
      demoWalletAddress: selectedWallet?.demoAddress,
      submittedAt: new Date().toISOString(),
      reference: `WW-${Date.now().toString().slice(-6)}`,
    }

    try {
      const payload = await apiRequest('/api/recovery-requests', {
        method: 'POST',
        body: JSON.stringify(nextSubmission),
      })

      window.localStorage.setItem(submissionStorageKey, JSON.stringify(payload.record))
      setSubmission(payload.record)
      setError('')
    } catch (requestError) {
      setError(`Could not save to JSON file. Start the API server and try again. ${requestError.message}`)
    }
  }

  const clearDraft = () => {
    window.localStorage.removeItem(storageKey)
    window.localStorage.removeItem(submissionStorageKey)
    setFormData(initialFormData)
    setSubmission(null)
    setError('')
  }

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
            <strong>Review fee</strong>
            <p>Preview the demo payment wallet and fee details.</p>
          </article>
          <article>
            <span>4</span>
            <strong>Written approval</strong>
            <p>Receive the scope and invoice before sending any payment.</p>
          </article>
        </section>

        <form className={styles.recoveryForm} onSubmit={submitRecoveryRequest}>
          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <p className={layoutStyles.kicker}>Your contact</p>
              <h2>How should we reply?</h2>
            </div>
            <div className={styles.fieldGrid}>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={updateFormData}
                  required
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={updateFormData}
                  required
                />
              </label>
              <label>
                Telegram or phone
                <input
                  type="text"
                  name="contact"
                  placeholder="Optional contact method"
                  value={formData.contact}
                  onChange={updateFormData}
                />
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
                <select
                  name="lockedLocation"
                  value={formData.lockedLocation}
                  onChange={updateFormData}
                  required
                >
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
                <input
                  type="text"
                  name="asset"
                  placeholder="Example: BTC, ETH, USDT"
                  value={formData.asset}
                  onChange={updateFormData}
                  required
                />
              </label>
              <label>
                Network
                <select
                  name="network"
                  value={formData.network}
                  onChange={updateFormData}
                  required
                >
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
                <input
                  type="text"
                  name="lockedAmount"
                  placeholder="Example: 0.25 BTC or 4,000 USDT"
                  value={formData.lockedAmount}
                  onChange={updateFormData}
                  required
                />
              </label>
              <label className={styles.wideField}>
                Public wallet address or account reference
                <input
                  type="text"
                  name="walletAddress"
                  placeholder="Public wallet address, exchange case ID, or platform username"
                  value={formData.walletAddress}
                  onChange={updateFormData}
                  required
                />
              </label>
              <label className={styles.wideField}>
                Transaction hash or public proof
                <textarea
                  name="transactionProof"
                  rows="4"
                  placeholder="Paste public transaction hashes, explorer links, dates, and the platform involved"
                  value={formData.transactionProof}
                  onChange={updateFormData}
                  required
                ></textarea>
              </label>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <p className={layoutStyles.kicker}>Review fee</p>
              <h2>Choose a demo wallet for the review fee flow.</h2>
              <p>
                This preview shows how the fee step works. The addresses below
                are demo placeholders and are not real payment wallets.
              </p>
            </div>
            <div className={styles.reviewFeeCard}>
              <div>
                <span>Demo review fee</span>
                <strong>$49</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>Preview only</strong>
              </div>
              <div>
                <span>Invoice timing</span>
                <strong>After review</strong>
              </div>
            </div>
            <div className={styles.paymentGrid}>
              {paymentWallets.map((wallet) => (
                <label className={styles.paymentOption} key={wallet.id}>
                  <input
                    type="radio"
                    name="paymentWallet"
                    value={wallet.id}
                    checked={formData.paymentWallet === wallet.id}
                    onChange={updateFormData}
                    required
                  />
                  <span>
                    <strong>{wallet.name}</strong>
                    <small>{wallet.asset} on {wallet.network}</small>
                  </span>
                </label>
              ))}
            </div>
            <div className={styles.fieldGrid}>
              <label>
                Paying from wallet address
                <input
                  type="text"
                  name="payingFrom"
                  placeholder="Optional public sender wallet"
                  value={formData.payingFrom}
                  onChange={updateFormData}
                />
              </label>
              <label>
                Preferred payment asset
                <input
                  type="text"
                  name="paymentAsset"
                  placeholder="Example: BTC, ETH, USDT, USD"
                  value={formData.paymentAsset}
                  onChange={updateFormData}
                />
              </label>
              <label>
                Fee speed preference
                <select
                  name="feeSpeed"
                  value={formData.feeSpeed}
                  onChange={updateFormData}
                >
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
                Review fee estimate
                <input
                  type="text"
                  value="$49 demo review fee"
                  readOnly
                />
              </label>
              <label className={styles.wideField}>
                Selected demo payment wallet
                <input
                  type="text"
                  value={selectedWallet?.demoAddress || 'Select a payment wallet above'}
                  readOnly
                />
              </label>
            </div>
            <p className={styles.saveNote}>
              Your entries are saved locally in this browser while you type, so
              refreshing the page will not clear the form.
            </p>
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

          {error && (
            <p className={styles.errorMessage}>{error}</p>
          )}

          <div className={styles.formActions}>
            <button className={styles.submitButton} type="submit">
              Request review and invoice details
            </button>
            <button className={styles.clearButton} type="button" onClick={clearDraft}>
              Clear saved draft
            </button>
          </div>
        </form>

        {submission && (
          <section className={styles.confirmationPanel} aria-live="polite">
            <div>
              <p className={layoutStyles.kicker}>Request saved</p>
              <h2>Review request created</h2>
              <p>
                Your request was saved to the JSON file with reference
                {' '}
                <strong>{submission.reference}</strong>
                .
              </p>
            </div>
            <dl>
              <div>
                <dt>Review fee</dt>
                <dd>{submission.reviewFee}</dd>
              </div>
              <div>
                <dt>Payment wallet</dt>
                <dd>{submission.demoWalletName}</dd>
              </div>
              <div>
                <dt>Demo wallet address</dt>
                <dd>{submission.demoWalletAddress}</dd>
              </div>
              <div>
                <dt>Locked funds</dt>
                <dd>{submission.lockedAmount} {submission.asset} on {submission.network}</dd>
              </div>
            </dl>
            <p className={styles.confirmationNote}>
              Demo only: do not send money to placeholder wallet addresses.
            </p>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Recover
