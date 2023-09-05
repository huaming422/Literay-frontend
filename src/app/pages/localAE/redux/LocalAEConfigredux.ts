import { persistReducer } from 'redux-persist'
import { Action } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GetDeviceConfigSettingTableData: '[GetDeviceConfigSettingTableData] Action',
  SetDeviceConfigSettingData: '[SetDeviceConfigSettingData] Action',
}

const initialDeviceConfigSettingState: IDeviceConfigSettingState = {
  deviceConfigSettingColumnValues: [],
}

export interface IDeviceConfigSettingState {
  deviceConfigSettingColumnValues: [],
}

export const reducer = persistReducer(
  { storage, key: 'literary-local', whitelist:  [ ] },
  (state: IDeviceConfigSettingState = initialDeviceConfigSettingState, action: any) => {
    switch (action.type) {
      case actionTypes.GetDeviceConfigSettingTableData: {
        const deviceConfigSettingColumnValues = action.payload.data;
        return { ...state, deviceConfigSettingColumnValues,};
      }
    
      case actionTypes.SetDeviceConfigSettingData: {
        const deviceConfigSettingColumnValues = action.payload.data;
        return { ...state, deviceConfigSettingColumnValues };
      }
      
      default:
        return state
    }
  }
)

export const actions = {
  getDeviceConfigSettingTableData: (data: any) => ({ type: actionTypes.GetDeviceConfigSettingTableData, payload: { data } }),
  setDeviceConfigSettingData: (data: any) => ({ type: actionTypes.SetDeviceConfigSettingData, payload: { data } }),
  store: () => ({ type: "def" }),
}

export function* saga() {

}
