import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async ({ name, surname, userName, email, password, phone }) => {
        setIsLoading(true);
        const response = await registerRequest({
            name,
            surname,
            userName,
            email,
            password,
            phone
        });
        setIsLoading(false);

        if (response?.data?.userDetails) {
            toast.success(response.data.message || "Cuenta creada con éxito");
            const { userDetails } = response.data;
            localStorage.setItem("user", JSON.stringify(userDetails));
            navigate('/');
        } else {
            toast.error(response?.e?.response?.data || 'Error al registrar la cuenta');
        }
    };
    return {
        register,
        isLoading
    };
};
