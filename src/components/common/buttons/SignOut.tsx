import React from 'react'
import { twMerge } from "tailwind-merge"
import Button from "."
import { ButtonProps } from 'primereact/button'
interface SignOutButtonProps extends ButtonProps {
  children: React.ReactNode
  className?: string
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ children, className, ...rest }) => {
  return (
    <Button className={twMerge('bg-transparent p-0 hover:bg-transparent', className)} {...rest}>
      {children}
    </Button>
  )
}

export default SignOutButton
