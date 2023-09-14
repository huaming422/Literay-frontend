export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState()

      config.headers.Authorization = `Basic YWRtaW46YWRtaW4=`
      if (accessToken) {
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}
