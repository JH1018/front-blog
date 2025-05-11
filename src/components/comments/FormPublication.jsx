import React, { useState, useEffect } from "react";
import {
    validateTitle,
    validateTitleMessage,
    validatePublicationContent,
    validatePublicationContentMessage
} from "../../shared/validators/";
import { Input } from "../settings/Input";
import { useRegisterPublication } from "../../shared/hooks/useRegisterPublication";
import { useGetCategory } from "../../shared/hooks/useGetCategory";
import "../../assets/styles/comments.css"

export const FormPublication = ({ onPublish }) => {
    const { publish } = useRegisterPublication();
    const { categories, getCategories, isLoading } = useGetCategory();

    const params = {
        value: "",
        isValid: false,
        showError: false
    };

    const [formState, setFormState] = useState({
        title: { ...params },
        category: { ...params },
        publicationContent: { ...params },
        owner: { ...params },
        categoryName: { ...params }
    });

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "title":
                isValid = validateTitle(value);
                break;
            case "publicationContent":
                isValid = validatePublicationContent(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const user = JSON.parse(localStorage.getItem("user"));
    let owner = user?.id;

    const handlePublish = async (event) => {
        event.preventDefault();
    
        const selectedCategory = categories.find(cat => cat.uid === formState.category.value);
        const categoryName = selectedCategory ? selectedCategory.name : "";
    
        const result = await publish({
            title: formState.title.value,
            category: formState.category.value, 
            publicationContent: formState.publicationContent.value,
            owner,
            categoryName 
        });
    
        onPublish(result);
    };
    

    const publishField = [
        {
            field: "title",
            label: "*Ingresa el título de la publicación",
            type: "text",
            validationMessage: validateTitleMessage,
            textarea: false
        },
        {
            field: "publicationContent",
            label: "Ingresa el contenido de la publicación",
            type: "text",
            validationMessage: validatePublicationContentMessage,
            textarea: true
        }
    ];

    return (
        <>
        <div className="publication-container">
            <form className="publication-form">
                <h2 className="form-title">Crea una Publicación</h2>
                {publishField.map(({ field, label, type, validationMessage, textarea }) => (
                    <Input
                        key={field}
                        field={field}
                        label={label}
                        value={formState[field].value}
                        onChangeHandler={handleInputValueChange}
                        type={type}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState[field].showError}
                        validationMessage={validationMessage}
                        className="input-field"
                        textArea={textarea}
                    />
                ))}
                <label className="form-label">Categoría</label>
                <select
                    className="input-field"
                    disabled={isLoading}
                    value={formState.category.value}
                    onChange={(e) => handleInputValueChange(e.target.value, "category")}
                >
                    <option value="">Selecciona una categoría</option>
                    {categories && categories.length > 0 ? (
                        categories.map(cat => (
                            <option key={cat.uid} value={cat.uid}>
                                {cat.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No hay categorías disponibles</option>
                    )}
                </select>
                <button type="button" onClick={handlePublish} className="publish-button">
                    Publicar
                </button>
            </form>
        </div>
        </>
    );
};
