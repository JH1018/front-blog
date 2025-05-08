import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginRequest } from "../../services/api";
import { useState } from "react";

export const useLogin = () =>{
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async(email, password) => {
        setIsLoading(true)
        const response = await loginRequest({
            email, password
        })
        setIsLoading(false)
        response.error ? toast.error(response.e?.response?.data || "Error al iniciar sesión") : toast.success(response.msg || "Inicio de Sesión exitoso");

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails))
        navigate("/")
    };
    return{ login, isloading}
};