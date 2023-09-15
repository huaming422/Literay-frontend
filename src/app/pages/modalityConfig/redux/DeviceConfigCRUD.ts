import axios from 'axios'

const API_URL = process.env.REACT_APP_ENV === 'prod' ? process.env.REACT_APP_API_PROD_URL : process.env.REACT_APP_API_DEV_URL

export function getModalityNames() {
  return axios.get(`/modalities`)
}


export function getDeviceConfigSettingsData(props: any) {
  return axios.post(`${API_URL}/system/device/config`, {...props})
}

export function createDeviceSetting(props: any) {
  return axios.post(`${API_URL}/system/device/config/create`, {...props})
}

export function updateDeviceConfigData(props: any) {
  return axios.post(`${API_URL}/system/device/config/update`,  {...props})
}


export function deleteDeviceConfigData(props: any) {
  return axios.post(`${API_URL}/system/device/config/delete`,  {...props})
}

