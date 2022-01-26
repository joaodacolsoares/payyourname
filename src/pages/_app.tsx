import 'tailwindcss/tailwind.css'
import '../styles/index.css';
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import { AnalyticsProvider } from 'use-analytics'

const analytics = Analytics({
  app: 'awesome-app',
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
