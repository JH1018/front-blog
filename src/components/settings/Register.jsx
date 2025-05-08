import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    validateConfirmPassword,
    validateConfirmPasswordMessage,
    validateEmail,
    validateEmailMessage,
    validateName,
    validateNameMessage,
    validatePassword,
    validatePasswordMessage,
    validatePhone,
    validatePhoneMessage,
    validateSurname,
    validateSurnameMessage,
    validateUsername,
    validateUsernameMessage,
} from "../../shared/validators";
import { Input } from "./Input";
import { useRegister } from "../../shared/hooks";
import "../../assets/styles/register.css"

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const params = {
        value: "",
        isValid: false,
        showError: false,
    };

    const [formState, setFormState] = useState({
        name: { ...params },
        surname: { ...params },
        userName: { ...params },
        email: { ...params },
        password: { ...params },
        passwordConfirm: { ...params },
        phone: { ...params },
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
            case "name":
                isValid = validateName(value);
                break;
            case "surname":
                isValid = validateSurname(value);
                break;
            case "userName":
                isValid = validateUsername(value);
                break;
            case "email":
                isValid = validateEmail(value);
                break;
            case "password":
                isValid = validatePassword(value);
                break;
            case "phone":
                isValid = validatePhone(value);
                break;
            case "passwordConfirm":
                isValid = validateConfirmPassword(formState.password.value, value);
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

    const handleRegister = (event) => {
        event.preventDefault();

        const userData = {
            name: formState.name.value,
            surname: formState.surname.value,
            userName: formState.userName.value,
            email: formState.email.value,
            password: formState.password.value,
            phone: formState.phone.value,
        };

        register(userData);
    };

    const isSubmitDisabled =
        isLoading ||
        !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.userName.isValid ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfirm.isValid ||
        !formState.phone.isValid;

    const registerFields = [
        {
            field: "name",
            label: "*Ingresa tu nombre",
            type: "text",
            validationMessage: validateNameMessage,
        },
        {
            field: "surname",
            label: "*Ingresa tu apellido",
            type: "text",
            validationMessage: validateSurnameMessage,
        },
        {
            field: "userName",
            label: "*Ingresa tu usuario",
            type: "text",
            validationMessage: validateUsernameMessage,
        },
        {
            field: "email",
            label: "*Ingresa tu correo",
            type: "text",
            validationMessage: validateEmailMessage,
        },
        {
            field: "password",
            label: "*Ingresa tu cotraseña",
            type: "password",
            validationMessage: validatePasswordMessage,
        },
        {
            field: "passwordConfirm",
            label: "*Ingresa de nuevo tu contraseña",
            type: "password",
            validationMessage: validateConfirmPasswordMessage,
        },
        {
            field: "phone",
            label: "*Ingresa tu telefono",
            type: "text",
            validationMessage: validatePhoneMessage,
        },
    ]

    return (
        <>
            <div className="background" />
            <div className="login-container">
                <form className="login-form">
                    <span style={{
                        position: "relative",
                        left: "33%",
                        fontSize: "25px"
                    }}>Registrate</span>
                    {registerFields.map(({ field, label, type, validationMessage }) => (
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
                            className="login-input"
                        />
                    ))}
                    <button type="button" onClick={handleRegister} className="login-button" disabled={isSubmitDisabled}>
                        Registrarse
                    </button>
                    <span className="login-switch-auth" onClick={switchAuthHandler}>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </span>
                </form>
            </div>
        </>
    );
};

Register.propTypes = {
    switchAuthHandler: PropTypes.func,
};
