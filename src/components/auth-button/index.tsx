import useAuth from '../../hooks/use-auth'
import GoogleIcon from '../icons/google-icon'

const AuthButton = ({ userLogged }: { userLogged: boolean }): JSX.Element => {
  const { handleSignIn, handleLogout } = useAuth()

  if (!userLogged) {
    return (
      <button
        type='button'
        onClick={handleSignIn}
        className='text-white bg-blue-primary hover:bg-blue-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-primary/55 mr-2 mb-2'
      >
        <GoogleIcon />
        Inicia con Google
      </button>
    )
  }

  return (
    <button
      type='button'
      onClick={handleLogout}
      className='text-white bg-red-primary hover:bg-red-primary/90 focus:ring-4 focus:outline-none focus:ring-red-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-red-primary/55 mr-2 mb-2'
    >
      <GoogleIcon />
      Cerrar sesión
    </button>
  )
}

export default AuthButton
