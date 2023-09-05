import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as auth from '../../app/pages/auth'
import * as modalityConfig from '../../app/pages/modalityConfig'
import * as localAE from '../../app/pages/localAE'
import * as devices from '../../app/pages/devices'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  modalityConfig: modalityConfig.reducer,
  localAE: localAE.reducer,
  devices: devices.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(), localAE.saga(), modalityConfig.saga(), devices.saga()])
}
