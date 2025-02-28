/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../../../app/pages/auth/models/UserModel'
import { RootState } from '../../../../setup'
import * as auth from '../../../../app/pages/auth/redux/AuthRedux'
import { Languages } from './Languages'
import { useDispatch } from 'react-redux'
import { toAbsoluteUrl } from '../../../helpers'
import { useHistory } from 'react-router-dom'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({ auth }: any) => auth.user, shallowEqual) as UserModel
  
  const history = useHistory();
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(auth.actions.logout())
    history.push('/auth/login')
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img style={{ objectFit: 'cover' }}
              alt='Logo'
              src={toAbsoluteUrl('/media/avatars/blank.png')}
            />
          </div>

          <div className='d-flex flex-column'>
            <a className='fw-bold text-muted text-hover-primary fs-7'>
              {
                user?.email
              }
            </a>
          </div>
        </div>
      </div>
      <div className='separator my-2'></div>
     
      <Languages />
      <div className='menu-item px-5'>
        <a id='btn_sign_out' onClick={Logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
