import { useState, useCallback } from "react";
import { getCategory as getCategoryRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetCategory = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getCategoryRequest();
            response?.data?.success ? (setCategories(response.data.category), toast.success("Categorías cargadas correctamente")) : toast.error("No se pudieron cargar las categorías.");
        } catch (error) {
            toast.error("Error al obtener las categorías.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        categories,
        getCategories,
        isLoading,
    };
};
