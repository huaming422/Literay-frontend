import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as auth from '../../app/pages/auth'
import * as modalityConfig from '../../app/pages/modalityConfig'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  modalityConfig: modalityConfig.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(), modalityConfig.saga()])
}
