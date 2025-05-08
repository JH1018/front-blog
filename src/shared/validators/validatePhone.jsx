export const validatePhone = (phone) => {
    const regex = /^\d{8}$/;

    return regex.test(phone);
}

export const validatePhoneMessage = 'El telefono debe contener 8 caracteres sin espacios y solo números'