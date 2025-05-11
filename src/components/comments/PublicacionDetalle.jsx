import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPublicationById } from '../../shared/hooks';
import {
    validatePublicationContent,
    validatePublicationContentMessage
} from '../../shared/validators/validatePublicationContent';
import "../../assets/styles/comments.css";
import { useComment } from '../../shared/hooks/useComment';
import { Input } from '../settings/Input';
import { Navbar } from '../navbar';

export const PublicacionDetalle = () => {
    const { id } = useParams();
    const { publication, getPublicationDetalle, isLoading, error } = useGetPublicationById(id);
    const { comment } = useComment();
    const params = {
        value: "",
        isValid: false,
        showError: false
    };

    const [formState, setFormState] = useState({
        content: { ...params },
    });

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
            case "content":
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
    const author = user?.id;

    const handleComment = async (event) => {
        event.preventDefault();
        await comment({
            author,
            content: formState.content.value,
            publication: id
        });

        getPublicationDetalle();

        setFormState((prevState) => ({
            ...prevState,
            content: {
                ...prevState.content,
                value: "",
                isValid: false,
                showError: false
            }
        }));
    };

    const commentFields = [
        {
            field: "content",
            label: "*Ingresa tu comentario",
            type: "text",
            validationMessage: validatePublicationContentMessage,
            textArea: true
        }
    ];

    useEffect(() => {
        getPublicationDetalle();
    }, [getPublicationDetalle]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Hubo un error al cargar la publicación.</p>;
    }

    const sortedComments = publication?.comments?.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <div className='main-container'>
            <Navbar />
            <div className="publication-detail-container">
                {publication ? (
                    <>
                        <div className="publication-header">
                            <h1 className="publication-title">{publication.title}</h1>
                            <span className="publication-category">
                                {publication.category?.name || "Sin categoría"}
                            </span>
                        </div>
                        <div className="publication-content">
                            <p>{publication.publicationContent}</p>
                        </div>
                        <div className="comments-section">
                            <h3>Comentarios</h3>
                            <h2 className="form-title">Comenta</h2>
                            {commentFields.map(({ field, label, type, validationMessage }) => (
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
                                />
                            ))}
                            <button onClick={handleComment}>Publicar</button>
                            {sortedComments && sortedComments.length > 0 ? (
                                <ul>
                                    {sortedComments.map((comment, index) => (
                                        <li key={index}>
                                            <p>
                                                <strong>
                                                    {(comment.author || 'Guest') + ' | ' + comment.date}:
                                                </strong> {comment.content}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay comentarios todavía.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>No se encontró la publicación.</p>
                )}
            </div>
        </div>
    );
};
