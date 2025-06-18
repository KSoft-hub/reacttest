import axios from 'axios'
import { Configuration } from '../types/typescript-axios'
import { TestTableRestControllerApiFactory } from '../types/typescript-axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: true
})

axios.interceptors.response.use(
    (response: any) => {
        return response
    },
    (error: any) => {
        if (axios.isCancel(error)) {
            return Promise.resolve()
        }
        console.error(error)
        return Promise.reject(error)
    }
)

const testTableApi = TestTableRestControllerApiFactory(new Configuration({ basePath: "http://localhost:8080" }), '', axiosInstance)

export default testTableApi
