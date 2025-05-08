import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    validateEmail,
    validateEmailMessage,
    validatePassword,
    validatePasswordMessage
} from "../../shared/validators"
import { Input } from "./Input"
import { useLogin } from "../../shared/hooks";
import "../../pages/Auth/login.css"

export const Login = ({ switchAuthHandler }) => {
    const { login } = useLogin();
    const params = {
        value: "",
        isValid: false,
        showError: false
    }

    const [formState, setFormState] = useState({
        email: { ...params },
        password: { ...params },
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
            case "email":
                isValid = validateEmail(value);
                break;
            case "password":
                isValid = validatePassword(value);
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

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.email.value, formState.password.value);
    };

    const loginFields = [
        {
            field: "email",
            label: "*Ingresa tu correo",
            type: "text",
            validationMessage: validateEmailMessage,
        },
        {
            field: "password",
            label: "*Ingresa tu contraseña",
            type: "password",
            validationMessage: validatePasswordMessage,
        }
    ];

    return (
        <div className="login-container">
            <form className="login-form">
            <span style={{
                        position: "relative",
                        left: "28%",
                        fontSize: "25px"
                    }}>Iniciar Sesión</span>
                {loginFields.map(({ field, label, type, validationMessage }) => (
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
                <button type="button" onClick={handleLogin} className="login-button">
                    Iniciar Sesión
                </button>
                <span className="login-switch-auth" onClick={switchAuthHandler}>
                    ¿No tienes una Cuenta? Regístrate
                </span>
            </form>
        </div>
    );
};

Login.propTypes = {
    switchAuthHandler: PropTypes.func.isRequired
};