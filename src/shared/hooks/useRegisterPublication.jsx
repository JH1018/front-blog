import { publish as publishRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegisterPublication = () =>{
    
    const [, setIsLoading] = useState(false);
    const publish = async({title,category,publicationContent,owner, categoryName}) => {
        setIsLoading(true)
        const response = await publishRequest({
            title,
            category,
            publicationContent,
            owner,
            categoryName
        })
        setIsLoading(false)
        response?.data?.publication ? toast.success(response.data.message || "Publicado con éxito") : toast.error(response?.e?.response?.data || "Error al publicar")
    };
    return{
        publish
    }
}   