export const validateName = (name) => {
    const regex = /^\S{3,15}$/

    return regex.test(name)
}

export const validateNameMessage = 'El nombre debe contener entre 3 y 15 caracteres sin espacios'