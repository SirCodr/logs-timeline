import { twMerge } from "tailwind-merge"
import Button from "."

const SignOutButton = (props) => {
  const { children, className, ...rest } = props
  return (
    <Button className={twMerge('bg-transparent p-0 hover:bg-transparent', className)} {...rest}>
      {children}
    </Button>
  )
}

export default SignOutButton