export const validateSurname = (surname) => {
    const regex = /^\S{3,15}$/

    return regex.test(surname)
}

export const validateSurnameMessage = 'El apellido debe contener entre 3 y 15 caracteres sin espacios'