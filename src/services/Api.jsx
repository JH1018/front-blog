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

export const login = async (data) => {
    try {
        return await apiClient.post("/auth/login", data)
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post("/auth/register", data)
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}

export const publish = async (data) => {
    try {
        return await apiClient.post("/publication/registerPublication/", data)
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}

export const getCategory = async () => {
    try {
        return await apiClient.get("/category/getCategory")
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}

export const getPublication = async () => {
    try {
        return await apiClient.get("/publication/getPublication/")
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}

export const getPublicationDetalle = async (id) => {
    try {
        return await apiClient.get(`/publication/getPublication/${id}`)
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}

export const comment = async (data) => {
    try {
        return await apiClient.post(`/comment/addComment/`, data)
    } catch (e) {
        return {
            error: true,
            e: e
        }
    }
}