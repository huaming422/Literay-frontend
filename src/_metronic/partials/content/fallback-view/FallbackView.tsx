import { toAbsoluteUrl } from '../../../helpers'

export function FallbackView() {
  return (
    <div className='d-flex align-items-center justify-content-center h-100'>
      <div className='d-flex justify-content-center '>
        <div className='d-flex justify-content-center flex-column align-items-center'>
          <img src={toAbsoluteUrl('/media/logos/logo.png')} alt='Start logo' width={100}/>
          <span>Loading...</span>
        </div>
      </div>

    </div>
  )
}
