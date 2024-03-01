import AuthButton from "../../components/auth-button"

const LoginPage = () => {
  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_3rem]'>
      <section className='w-full h-full  grid place-items-center'>
        <article className='flex flex-col gap-y-3 px-5 py-3 bg-white shadow-md rounded-sm'>
        <h1 className='font-semibold text-base md:text-lg'>Inicia sesión</h1>
        <form>
          <AuthButton userLogged={false} />
        </form>
      </article>
      </section>
    </div>
  )
}

export default LoginPage
