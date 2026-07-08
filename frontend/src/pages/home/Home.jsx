import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/layout/Layout.jsx'
import styles from './Home.module.css'

const stats = [
  ['24h', 'initial review window'],
  ['100%', 'non-custodial process'],
  ['0', 'seed phrases requested'],
  ['8+', 'chain families reviewed'],
]

const assets = ['BTC', 'ETH', 'BNB', 'SOL', 'TRX', 'USDT']

const marketCoins = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$64,240',
    change: '+2.4%',
    volume: '$41.8B',
    fee: 'High security',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,280',
    change: '+1.8%',
    volume: '$22.6B',
    fee: 'Gas network',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$148.60',
    change: '+4.7%',
    volume: '$5.9B',
    fee: 'Fast transfers',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: '$1.00',
    change: '+0.1%',
    volume: '$78.4B',
    fee: 'Stable invoice',
  },
]

const slides = [
  {
    title: 'Watch-only wallet review',
    text: 'Understand why a wallet is view-only, what access may be missing, and what proof is safe to collect.',
    tag: 'Access check',
  },
  {
    title: 'Suspicious transfer tracing',
    text: 'Organize public transaction hashes into a timeline for exchanges, banks, or official reports.',
    tag: 'Trace report',
  },
  {
    title: 'Recovery readiness plan',
    text: 'Get a written next-step plan before you approve any paid recovery work or documentation support.',
    tag: 'Action plan',
  },
]

const recoverySteps = [
  {
    title: 'Collect public details',
    text: 'Wallet address, transaction hash, chain name, date, exchange name, and a short incident summary.',
  },
  {
    title: 'Get a written review',
    text: 'We explain what is visible on-chain, what is unknown, and which recovery paths may be realistic.',
  },
  {
    title: 'Approve the next step',
    text: 'If the case is eligible, you receive scope, timing, and payment options before work starts.',
  },
]

const supportItems = [
  'Watch-only wallet access guidance',
  'Public transaction timeline reports',
  'Exchange and law-enforcement evidence packs',
  'Wallet safety review after an incident',
  'Plain-language next steps for beginners',
  'No custody, no seed phrase collection',
]

const faqs = [
  [
    'Can you guarantee funds will return?',
    'No. Blockchain transfers are usually final. We can help document what happened and identify legitimate recovery routes.',
  ],
  [
    'Do I need to pay before a review?',
    'No. Start with public case details. Any paid work should be tied to a written scope and clear invoice.',
  ],
  [
    'What should I never send?',
    'Never send seed phrases, private keys, passwords, 2FA codes, or remote access to your device.',
  ],
]

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  const showSlide = (direction) => {
    setActiveSlide((current) => {
      const next = current + direction

      if (next < 0) {
        return slides.length - 1
      }

      if (next >= slides.length) {
        return 0
      }

      return next
    })
  }

  return (
    <Layout>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Self-custody support</p>
            <h1>Recover with a clearer, safer wallet plan.</h1>
            <p className={styles.lede}>
              WatchWallet helps you review wallet incidents, organize public
              transaction details, and understand legitimate next steps without
              asking for your secret phrase.
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
            <div className={styles.orbitOne} aria-hidden="true"></div>
            <div className={styles.orbitTwo} aria-hidden="true"></div>
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

        <section className={styles.cookieHelp}>
          <strong>Easy start:</strong>
          <span>
            Submit public wallet details, wait for the review, then decide on
            the next documented step. Do not send secrets or upfront wallet
            payments to anyone claiming guaranteed recovery.
          </span>
        </section>

        <section className={styles.stats} aria-label="Service highlights">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className={styles.marketSection} aria-label="Crypto market overview">
          <div className={styles.marketIntro}>
            <p className={styles.eyebrow}>Web3 market view</p>
            <h2>Track coins, fees, and recovery payment routes.</h2>
            <p>
              Use this static market board to understand common assets, network
              behavior, and payment options before your case is reviewed.
            </p>
          </div>

          <div className={styles.tradeBoard}>
            <div className={styles.coinGrid}>
              {marketCoins.map((coin, index) => (
                <article
                  className={styles.coinCard}
                  key={coin.symbol}
                  style={{ '--delay': `${index * 110}ms` }}
                >
                  <div className={styles.coinHeader}>
                    <span>{coin.symbol}</span>
                    <strong>{coin.change}</strong>
                  </div>
                  <h3>{coin.name}</h3>
                  <p>{coin.price}</p>
                  <div>
                    <small>24h volume</small>
                    <b>{coin.volume}</b>
                  </div>
                  <em>{coin.fee}</em>
                </article>
              ))}
            </div>

            <aside className={styles.tradePanel} aria-label="Trade route preview">
              <div className={styles.panelTop}>
                <span>Route preview</span>
                <strong>USDT / TRON</strong>
              </div>
              <div className={styles.chart}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.tradeRows}>
                <div>
                  <span>Network fee</span>
                  <strong>Low</strong>
                </div>
                <div>
                  <span>Review status</span>
                  <strong>Required</strong>
                </div>
                <div>
                  <span>Invoice wallet</span>
                  <strong>After approval</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.sliderSection} aria-label="Recovery service slides">
          <div className={styles.sliderCopy}>
            <p className={styles.eyebrow}>Choose your case type</p>
            <h2>Support that matches what happened.</h2>
            <p>
              Each case starts with public information only. Use the slides to
              see the common review paths before you submit a request.
            </p>
          </div>
          <div className={styles.slideCard}>
            <span>{slide.tag}</span>
            <h3>{slide.title}</h3>
            <p>{slide.text}</p>
            <div className={styles.slideControls}>
              <button type="button" onClick={() => showSlide(-1)} aria-label="Previous slide">
                Prev
              </button>
              <div aria-label="Slide position">
                {slides.map((item, index) => (
                  <button
                    className={index === activeSlide ? styles.activeDot : ''}
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${item.title}`}
                  ></button>
                ))}
              </div>
              <button type="button" onClick={() => showSlide(1)} aria-label="Next slide">
                Next
              </button>
            </div>
          </div>
        </section>

        <section className={styles.featureSection}>
          <div>
            <p className={styles.eyebrow}>Recovery workflow</p>
            <h2>Simple, documented, and non-custodial.</h2>
          </div>
          <div className={styles.featureGrid}>
            {recoverySteps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.supportSection}>
          <div>
            <p className={styles.eyebrow}>What we help with</p>
            <h2>More clarity, less confusion.</h2>
            <p>
              The goal is to make your next step obvious: what to collect, who
              to contact, and what risk to avoid.
            </p>
          </div>
          <ul>
            {supportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.faqSection}>
          <div>
            <p className={styles.eyebrow}>Common questions</p>
            <h2>Before you start</h2>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map(([question, answer]) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Home
