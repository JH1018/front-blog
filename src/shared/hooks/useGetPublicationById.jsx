import { useState, useCallback } from "react";
import { getPublicationDetalle as getPublicationDetalleRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetPublicationById = (id) => {
    const [publication, setPublication] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPublicationDetalle = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getPublicationDetalleRequest(id);
            response?.data?.success ? setPublication(response.data.publication) : toast.error("No se pudo cargar la publicación.");
        } catch (error) {
            toast.error("Error al obtener los detalles de la publicación.");
            setError(error);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);
    return {
        publication,
        getPublicationDetalle,
        isLoading,
        error,
    };
};
