/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import { useAuth } from '../../../../setup/context/AppContext'
import { useLayout } from '../../core'
import { Header } from './Header'
import { Topbar } from './Topbar'

export function HeaderWrapper() {
  const { classes } = useLayout()
  const { currentStep, handleCurrentStep } = useAuth();

  const handleBack = () => {
    let nextStep = currentStep - 1;
    handleCurrentStep(nextStep);
  }
  return (
    <div
      id='kt_header'
      className='header align-items-stretch'
      style={{ left: 0 }}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {
          currentStep === 2 &&
          <div className='d-flex justify-content-center align-items-center'>
            <button
              className='btn btn-sm btn-flex btn-primary btn-active-primary fw-bolder'
              style={{ height: '40px' }}
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        }
        {/* begin::Wrapper */}
        <div className='d-flex align-items-center justify-content-between flex-lg-grow-1'>
          <div className='d-flex align-items-stretch' id='kt_header_nav'>
            <Header />
          </div>

          <div className='d-flex align-items-center flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
