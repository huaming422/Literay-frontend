import { persistReducer } from 'redux-persist'
import { Action } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GetPatientData: '[GetPatientData] Action',
  GetStudyData: '[GetStudyData] Action',
  GetSeriesData: '[GetSeriesData] Action',
  GetImagesData: '[GetImagesData] Action',
}

const initialDeviceConfigSettingState: IDeviceConfigSettingState = {
  patientColumnValues: [],
  studyColumnValues: [],
  seriesColumnValues: [],
  imagesColumnValues: [],
}

export interface IDeviceConfigSettingState {
  patientColumnValues: [],
  studyColumnValues: [],
  seriesColumnValues: [],
  imagesColumnValues: [],
}

export const reducer = persistReducer(
  { storage, key: 'literary-patients', whitelist:  [ ] },
  (state: IDeviceConfigSettingState = initialDeviceConfigSettingState, action: any) => {
    switch (action.type) {
      case actionTypes.GetPatientData: {
        const patientColumnValues = action.payload.data;
        return { ...state, patientColumnValues,};
      }
      case actionTypes.GetStudyData: {
        const studyColumnValues = action.payload.data;
        return { ...state, studyColumnValues,};
      }
      case actionTypes.GetSeriesData: {
        const seriesColumnValues = action.payload.data;
        return { ...state, seriesColumnValues,};
      }
      case actionTypes.GetImagesData: {
        const imagesColumnValues = action.payload.data;
        return { ...state, imagesColumnValues,};
      }
      
      default:
        return state
    }
  }
)

export const actions = {
  getPatientData: (data: any) => ({ type: actionTypes.GetPatientData, payload: { data } }),
  getStudyData: (data: any) => ({ type: actionTypes.GetStudyData, payload: { data } }),
  getSeriesData: (data: any) => ({ type: actionTypes.GetSeriesData, payload: { data } }),
  getImagesData: (data: any) => ({ type: actionTypes.GetImagesData, payload: { data } }),
  store: () => ({ type: "def" }),
}

export function* saga() {

}
