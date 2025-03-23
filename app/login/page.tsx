'use client'
import { Button } from '@heroui/button'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'
import { useState } from 'react'

import { login, signup } from './actions'

import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons'

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Form className="w-full max-w-xs">
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <Input
        className="max-w-xs"
        endContent={
          <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        label="Password"
        placeholder="Enter your password"
        type={isVisible ? 'text' : 'password'}
        variant="bordered"
      />
      <div className="my-2" />
      <div className="flex flex-row gap-2 ">
        <Button formAction={login} type="submit" variant="bordered">
          Log in
        </Button>
        <Button formAction={signup} type="submit" variant="bordered">
          Sign up
        </Button>
      </div>
    </Form>
  )
}
