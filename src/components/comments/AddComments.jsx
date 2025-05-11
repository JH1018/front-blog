import React, { useState, useEffect } from 'react';
import "../../assets/styles/comments.css";
import { FormPublication } from './FormPublication';
import { useGetPublications } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar';
import toast from 'react-hot-toast';

export const AddComments = () => {
    const [isVisible, setVisible] = useState(false);
    const [isButtonVisible, setButtonVisible] = useState(true);
    const [isContentVisible, setContentVisivle] = useState(true);
    const [publishMessage, setPublishMessage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const { publications, getPublications, isLoading } = useGetPublications();
    const navigate = useNavigate();

    useEffect(() => {
        getPublications();
    }, [getPublications]);

    const handleAddCommentClick = (id) => {
        navigate(`/publicacion/${id}`);
    };

    const handlePublishComplete = (result) => {
        setPublishMessage(result);
        setVisible(false);
        setButtonVisible(true);
        setContentVisivle(true);
        getPublications();
    };

    const handleDisable = () => {
        if (!localStorage.getItem("user")) {
            toast.error("Debes Iniciar Sesión para publicar");
            setVisible(false);
            setButtonVisible(true);
            setContentVisivle(true);
            getPublications();
            return;
        }
        setVisible(true);
        setButtonVisible(false);
        setContentVisivle(false);
    };

    const filteredPublications = publications
        .filter(pub => selectedCategory === '' || pub.categoryName === selectedCategory)
        .reverse();

    return (
        <>
            <Navbar />
            <div className='container'>
            <div className='title-container'>
                {isVisible && <FormPublication onPublish={handlePublishComplete} />}
                {isButtonVisible && (
                    <button className='button-add-comment' onClick={handleDisable}>
                        Comentar
                    </button>
                )}
            </div>
            <div>
                {isContentVisible && (
                    <>
                        <h3 className='title'>Publicaciones</h3>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="category-filter"
                        >
                            <option value="">Todas</option>
                            <option value="Taller">Taller</option>
                            <option value="Tecnología">Tecnología</option>
                        </select>
                        {isLoading ? (
                            <p>Cargando publicaciones...</p>
                        ) : (
                            <ul className="publication-list">
                                {filteredPublications.length > 0 ? (
                                    filteredPublications.map((publication) => (
                                        <li key={publication.uid} className="publication-item">
                                            <h4 className="publication-title">{publication.title}</h4>
                                            <p>Curso: {publication.categoryName}</p>
                                            <p className="publication-content">{publication.publicationContent}</p>
                                            <button
                                                className="comment-button"
                                                onClick={() => handleAddCommentClick(publication.uid)}
                                            >
                                                Comentar
                                            </button>
                                            <span>{publication.date}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="no-publications">No hay publicaciones disponibles.</p>
                                )}
                            </ul>
                        )}
                    </>
                )}
            </div>
            </div>
            {publishMessage?.message && (<p className="success-message">{publishMessage.message}</p>)}
        </>
    );
};
