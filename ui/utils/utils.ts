import { redirect } from 'next/navigation'

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string): never {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T & { cancel?: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return debounced as T & { cancel?: () => void }
}
// This utility function provides a way to redirect users to a specified path with an encoded message as a query parameter.
// It takes in a type ('error' or 'success'), a path, and a message, then performs the redirect.

import { LoadingState } from '@react-types/shared'

export function getLoadingState(isLoading: boolean, isError: boolean): LoadingState {
  if (isLoading) {
    return 'loading'
  }

  if (isError) {
    return 'error'
  }

  return 'idle'
}
// This function determines the loading state based on the loading and error flags.
