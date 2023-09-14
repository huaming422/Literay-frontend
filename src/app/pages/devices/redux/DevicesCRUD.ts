import axios from 'axios'

export function getPatientData() {
  return axios.get(`/patients?expand&since=0&limit=101&ful`)
}

export function getStudytData(patientId: string) {
  return axios.get(`/patients/${patientId}/studies?full`)
}

