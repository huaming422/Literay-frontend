import { persistReducer } from 'redux-persist'
import { Action } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GetStatisticsData: '[GetStatisticsData] Action',
  GetSystemInfoData: '[GetSysteInfoData] Action',
}

const initialSettingState: ISettingState = {
  systemInfo: [],
  statistics: [],
}

export interface ISettingState {
  systemInfo: [],
  statistics: [],
}

export const reducer = persistReducer(
  { storage, key: 'literary-settings', whitelist:  [ "systemInfo"] },
  (state: ISettingState = initialSettingState, action: any) => {
    switch (action.type) {
      
      case actionTypes.GetStatisticsData: {
        const statistics = action.payload.data;
        return { ...state, statistics,};
      }
      case actionTypes.GetSystemInfoData: {
        const systemInfo = action.payload.data;
        return { ...state, systemInfo,};
      }
      
      default:
        return state
    }
  }
)

export const actions = {
  getStatisticsData: (data: any) => ({ type: actionTypes.GetStatisticsData, payload: { data } }),
  getSystemInfoData: (data: any) => ({ type: actionTypes.GetSystemInfoData, payload: { data } }),
  store: () => ({ type: "def" }),
}

export function* saga() {

}
