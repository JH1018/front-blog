import { useState, useCallback } from "react";
import { getPublication as getPublicationRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetPublications = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPublications = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getPublicationRequest();
            response?.data?.success ? (setPublications(response.data.publication)): toast.error("No se pudieron cargar las publicaciones.");
        } catch (error) {
            toast.error("Error al obtener las publicaciones.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        publications,
        getPublications,
        isLoading,
    };
};
