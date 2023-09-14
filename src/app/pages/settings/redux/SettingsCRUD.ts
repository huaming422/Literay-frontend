import axios from 'axios'

export function getStatisticsData() {
  return axios.get(`/statistics`)
}
export function getSystemInfoData() {
  return axios.get(`/system`)
}
