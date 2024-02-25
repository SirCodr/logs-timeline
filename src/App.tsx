import Header from './components/header'
import Home from './pages/home'

function App() {
  return (
    <main className='w-screen h-screen'>
      <div className='w-screen h-screen absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'></div>
      </div>
      <div className=' flex flex-col gap-y-3 p-4 w-full h-full'>
        <Header />
        <Home />
      </div>
    </main>
  )
}

export default App
