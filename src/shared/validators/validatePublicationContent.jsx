export const validatePublicationContent = (name) => {
    const regex = /^.{3,500}$/

    return regex.test(name)
}
export const validatePublicationContentMessage = 'El contenido debe contener entre 3 y 500 caracteres'