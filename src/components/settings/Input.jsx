import React from "react";
import PropTypes from "prop-types";

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea,
    className
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field)
    }

    const handleOnBlur = (event) => {
        onBlurHandler(event.target.value, field)
    }

    return (
        <>
            <div className='auth-form-label'>
                <span style={{
                    fontSize: "19px"
                }}>{label}</span>
            </div>
            {textArea ? (
                <textarea
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    rows={5}
                    style={{ width: '436px', height: "200px" }}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    className={className}
                />
            )}
            <span className='auth-form-validation-message' style={{fontSize: "19px"}}>
                {showErrorMessage && validationMessage}
            </span>
        </>
    )
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string.isRequired,
    onBlurHandler: PropTypes.func.isRequired,
    textArea: PropTypes.bool
}