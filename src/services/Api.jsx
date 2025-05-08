import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3005/commentManager/v1",
    timeout: 3000,
    httpsAgent: false
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user")

        if (userDetails) {
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)

export const login = async(data) =>{
    try{
        return await apiClient.post("/auth/login", data)
    }catch(e){
        return{
            error: true,
            e: e
        }
    }
}

export const register = async(data) =>{
    try{
        return await apiClient.post("/auth/register", data)
    }catch(e){
        return{
            error: true,
            e: e
        }
    }
}