import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import AuthInit from './pages/auth/redux/AuthInit'
import { Routes } from './routing/Routes'
import { AuthProvider } from '../setup/context/AppContext'
import { ToastContainer } from 'react-toastify';

type Props = {
  basename: string
}

const App: React.FC<Props> = ({ basename }) => {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthProvider>
              <AuthInit>
              <ToastContainer/>
                <Routes />
              </AuthInit>
            </AuthProvider>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export { App }
