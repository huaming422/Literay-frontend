import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'


export function PrivateRoutes() {

  // const ServerConfigPage = lazy(() => import('../pages/serverConfig/ServerConfigPageWrapper'))

  return (
    <Suspense fallback={<FallbackView />}>
      {
        <Switch>

          {/* <Route exact path='/devices/:id' component={ServerConfigPage} /> */}

          <Redirect from='/auth' to={`/settings/modality`} />
          <Redirect exact from='/' to={`/settings/modality`} />
          <Redirect to='error/404' />
        </Switch>
      }
    </Suspense>
  )
}
