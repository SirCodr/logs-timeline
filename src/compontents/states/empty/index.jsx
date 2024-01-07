import { NO_RESULTS_FOUND_MESSAGE } from '../../../consts/stateMessages'
import NotFoundIcon from '../../icons/NotFound'

const EmptyState = ({ message, children }) => {
  return (
    <div className='flex flex-col gap-y-4 justify-center text-center w-24'>
      <section className='w-full'>
        <NotFoundIcon />
      </section>
      <section className='w-full'>
        <strong>{NO_RESULTS_FOUND_MESSAGE}</strong>
        {message && <small>{message}</small>}
        {children}
      </section>
    </div>
  )
}

export default EmptyState
