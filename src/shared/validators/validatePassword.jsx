export const validatePassword = (password) => {
    const regex = /^\S{6,18}$/

    return regex.test(password)
}

export const validatePasswordMessage = 'El password debe contener entre 6 y 18 caracteres sin espacios'

