import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'


export function PrivateRoutes() {

  const DeviceConfigPage = lazy(() => import('../pages/modalityConfig/DeviceConfigWrapper'))
  const LocalAEConfigPage = lazy(() => import('../pages/localAE/LocalAEWrapper'))

  return (
    <Suspense fallback={<FallbackView />}>
      {
        <Switch>

          <Route exact path='/modality' component={DeviceConfigPage} />
          <Route exact path='/local-ae' component={LocalAEConfigPage} />

          <Redirect from='/auth' to={`/modality`} />
          <Redirect exact from='/' to={`/modality`} />
          <Redirect to='error/404' />
        </Switch>
      }
    </Suspense>
  )
}
