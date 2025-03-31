'use client'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export function useLogger(componentName: string) {
  const log = {
    debug: (...args: any[]) => Sentry.captureMessage(`[${componentName}]`, ...args, 'debug'),
    trace: (...args: any[]) => Sentry.captureMessage(`[${componentName}]`, ...args, 'trace'),
    info: (...args: any[]) => Sentry.captureMessage(`[${componentName}]`, ...args, 'info'),
    warn: (...args: any[]) => Sentry.captureMessage(`[${componentName}]`, ...args, 'warn'),
    error: (...args: any[]) => Sentry.captureMessage(`[${componentName}]`, ...args, 'error'),
    fatal: (...args: any[]) => Sentry.captureMessage(`[${componentName}]`, ...args, 'fatal'),
  }

  useEffect(() => {
    log.debug('Component mounted')

    return () => {
      log.debug('Component unmounted')
    }
  }, [])

  return log
}
