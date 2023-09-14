import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'


export function PrivateRoutes() {

  const DeviceConfigPage = lazy(() => import('../pages/modalityConfig/DeviceConfigWrapper'))
  const LocalAEConfigPage = lazy(() => import('../pages/localAE/LocalAEWrapper'))
  const DevicesPage = lazy(() => import('../pages/devices/DevicesWrapper'))
  const SettingsPage = lazy(() => import('../pages/settings/SettingsWrapper'))

  return (
    <Suspense fallback={<FallbackView />}>
      {
        <Switch>

          <Route exact path='/modality' component={DeviceConfigPage} />
          <Route exact path='/local-ae' component={LocalAEConfigPage} />
          <Route exact path='/devices/:id' component={DevicesPage} />
          <Route exact path='/settings' component={SettingsPage} />

          <Redirect from='/auth' to={`/modality`} />
          <Redirect exact from='/' to={`/modality`} />
          <Redirect to='error/404' />
        </Switch>
      }
    </Suspense>
  )
}
