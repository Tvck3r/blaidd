import { addToast } from '@heroui/toast'
import { UseMutationResult } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Props {
  mutation: UseMutationResult<any, Error, any, unknown>
  onClose?: Function
  errorMessage?: string
}

export default function MutationResponseToast({ mutation, errorMessage }: Props) {
  //state
  const [showing, setShowing] = useState(false)

  //effects
  useEffect(() => {
    if (mutation.isIdle) return
    if (showing) return
    if (mutation.isError) {
      setShowing(true)
      console.log(mutation.error.message)
      addToast({
        title: 'Error',
        description: errorMessage || 'An error occurred',
        color: 'danger',
        timeout: 3000,
        onClose: () => {
          console.log('Toast closed')
          setShowing(false)
          // mutation.reset();
        },
      })
    } else if (mutation.isSuccess) {
      setShowing(true)
      addToast({
        title: 'Success',
        description: 'Operation completed successfully',
        color: 'success',
        timeout: 1000,
        onClose: () => {
          console.log('Toast closed')
          setShowing(false)
          // mutation.reset();
        },
      })
    }
  }, [mutation.status])

  return null
}
