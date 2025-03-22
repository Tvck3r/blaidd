import { addToast } from '@heroui/toast'
import { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Props {
  query: UseQueryResult<any, Error>
  onClose?: Function
  errorMessage?: string
}

export default function ErrorToast({ query, onClose, errorMessage }: Props) {
  const [showing, setShowing] = useState(false)

  //effects
  useEffect(() => {
    if (showing) return
    if (query.isError) {
      setShowing(true)
      console.log('error', query.error)
      addToast({
        title: 'Error',
        description: errorMessage || 'An error occurred',
        color: 'danger',
        timeout: 3000,
        onClose: () => {
          console.log('Toast closed')
          setShowing(false)
          onClose && onClose()
          // mutation.reset();
        },
      })
    }
  }, [query.status])

  return null
}
