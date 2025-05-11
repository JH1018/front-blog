export const validateTitle = (title) => {
    const regex = /^\S{3,30}$/

    return regex.test(title)
}

export const validateTitleMessage = 'El título debe contener entre 3 y 30 carácteres'