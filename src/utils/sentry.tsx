// src/utils/sentry.js
import * as Sentry from '@sentry/nextjs'

const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  })
}

export default initSentry
