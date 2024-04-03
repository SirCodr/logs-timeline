import { twMerge } from 'tailwind-merge'
import { ButtonProps, Button as PrimeButton } from 'primereact/button'

const Button = (props: ButtonProps) => {
  const { children, className, ...rest } = props
  return (
    <PrimeButton
      className={twMerge(
        'w-auto h-auto px-2 py-1 rounded text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300 disabled:text-primary-700',
        className
      )}
      {...rest}
    >
      {children}
    </PrimeButton>
  )
}

export default Button
