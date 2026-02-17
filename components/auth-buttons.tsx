'use client'

import { useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export function SignInButtonComponent() {
  const { openSignIn } = useClerk()
  
  return (
    <Button 
      variant="outline" 
      onClick={() => openSignIn({
        forceRedirectUrl: '/dashboard'
      })}
    >
      Sign in
    </Button>
  )
}

export function SignUpButtonComponent() {
  const { openSignUp } = useClerk()
  
  return (
    <Button 
      onClick={() => openSignUp({
        forceRedirectUrl: '/dashboard'
      })}
    >
      Sign up
    </Button>
  )
}
