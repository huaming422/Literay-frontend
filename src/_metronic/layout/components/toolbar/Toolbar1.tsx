/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC } from 'react'
import { useAuth } from '../../../../setup/context/AppContext'
// import {KTSVG} from '../../../helpers'
import { useLayout } from '../../core'
import { DefaultTitle } from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {
  const { classes } = useLayout()

  const { currentStep, handleCurrentStep } = useAuth();

  const handleBack = () => {
    let nextStep = currentStep - 1;
    handleCurrentStep(nextStep);
  }

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-start')}
      >
        {
          // currentStep !== 2 && <DefaultTitle />
        <DefaultTitle />
        }
        {
          currentStep === 2 &&
          <button
            className='btn btn-sm btn-flex btn-light btn-active-primary fw-bolder'
            style={{ height: '40px' }}
            onClick={handleBack}
          >
            Back
          </button>
        }
      </div>
      {/* end::Container */}
    </div>
  )
}

export { Toolbar1 }
