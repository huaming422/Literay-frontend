import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'


export function PrivateRoutes() {

  const ServerConfigPage = lazy(() => import('../pages/modalityConfig/DeviceConfigWrapper'))

  return (
    <Suspense fallback={<FallbackView />}>
      {
        <Switch>

          <Route exact path='/modality' component={ServerConfigPage} />

          <Redirect from='/auth' to={`/modality`} />
          <Redirect exact from='/' to={`/modality`} />
          <Redirect to='error/404' />
        </Switch>
      }
    </Suspense>
  )
}
