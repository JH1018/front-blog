import { comment as commentRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useState } from "react";

export const useComment = () => {
    const [isLoading, setIsLoading] = useState(false);

    const comment = async ({ author, content, publication, guestOwner }) => {
        setIsLoading(true);
        const response = await commentRequest({
            author,
            content,
            publication,
            guestOwner
        });
        setIsLoading(false);

        if (response?.data?.comment) {
            toast.success(response.data.message || "Comentario agregado con éxito");
        } else {
            toast.error(response?.e?.response?.data || 'Error al comentar');
        }
    };
    return {
        comment,
        isLoading
    };
};