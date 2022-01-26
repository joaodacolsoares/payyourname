import 'tailwindcss/tailwind.css'
import '../styles/index.css';
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import { AnalyticsProvider, useAnalytics } from 'use-analytics'

const analytics = Analytics({
  app: 'pay-your-name',
  plugins: [
    googleAnalytics({
      trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    })
  ]
})

function MyApp({ Component, pageProps }) {
  return (
    <AnalyticsProvider instance={analytics}>
      <Component {...pageProps} />
    </AnalyticsProvider>
  )
}

export default MyApp
