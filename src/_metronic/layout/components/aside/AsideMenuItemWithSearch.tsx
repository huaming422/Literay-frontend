import React from 'react'
import clsx from 'clsx'
import { useLocation, useHistory } from 'react-router'
import { checkIsActive, KTSVG } from '../../../helpers'
import { useLayout } from '../../core'
import { useIntl } from 'react-intl'
import { useAuth } from '../../../../setup/context/AppContext'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../setup'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItemWithSearch: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config
  const history = useHistory();

  const { handleCurrentStep } = useAuth();
  const rights: any = useSelector<RootState>(({ auth }: any) => auth.rights, shallowEqual);

  const handleSearch = () => {
    if (rights['admin_allsystems'] || rights['admin_ownagentsystems']) {
      history.push('/searchFilter')
      handleCurrentStep(1);
    }
  }

  const intl = useIntl()

  return (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
        <div className='d-flex justify-content-center align-items-center'>
          <button
            className='btn btn-sm btn-flex btn-primary btn-active-primary fw-bolder'
            style={{ height: '40px' }}
            onClick={handleSearch}
          >
            {intl.formatMessage({ id: 'SEARCH.TITLE' })}
          </button>
        </div>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  )
}

export { AsideMenuItemWithSearch }
