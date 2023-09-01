/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { FC } from 'react'
import { KTSVG } from '../../../helpers'
import { useLayout } from '../../core'


const toolbarButtonMarginClass = 'ms-1 ms-lg-3';

const Topbar: FC = () => {
  const { config } = useLayout()

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* begin::User */}
    
      <div
        className={clsx('d-flex align-items-center justify-content-between', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >

        <div
          className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
          data-kt-menu-trigger='click'
          id='btn_user-menu'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
        </div>
      </div>

    </div>
  )
}

export { Topbar }
