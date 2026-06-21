import axios from 'axios'

let axiosInstance=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export default axiosInstance