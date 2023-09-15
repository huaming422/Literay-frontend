import axios from 'axios'

export function getPatientData() {
  return axios.get(`/patients?expand&since=0&limit=101&full`)
}

export function getStudytData(patientId: string) {
  return axios.get(`/patients/${patientId}/studies?full`)
}

export function getSeriestData(studyid: string) {
  return axios.get(`/studies/${studyid}/series?full`)
}

export function getImagesData(seriesid: string) {
  return axios.get(`/series/${seriesid}/instances?full`)
}

export function getFilteringData(props: any) {
  return axios.post(`/tools/find`, {...props})
}

export function uploadPatients(props: any) {
  return axios.post(`/modalities/LiteryMainPACS/store`, {...props})
}

export function deletePatient(uid: string) {
  return axios.delete(`/patients/${uid}`)
}

export function deleteStudy(uid: string) {
  return axios.delete(`/studies/${uid}`)
}

export function deleteSeries(uid: string) {
  return axios.delete(`/series/${uid}`)
}

export function deleteInstance(uid: string) {
  return axios.delete(`/instances/${uid}`)
}
