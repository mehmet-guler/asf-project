import React, { useContext, useImperativeHandle, useEffect, useState } from 'react'
import { FormContext } from './Form';
import ErrorLabel from './ErrorLabel';
import * as ValidationHelper from './validationHelper';
import * as DefaultValidationMessage from './DefaultValidationMessages';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Input({ name, validate, type, placeholder, rows, cols, options }) {

    const formContext = useContext(FormContext);
    const { generateRef, handleSetIsRender, onChange, removeError, handleSetErrors, isRender, errors, showErrorLabel } = formContext;

    const [value, setValue] = useState("")
    const [ref, setRef] = useState(null)

    // Ref must be set every time the component changes
    useEffect(() => {
        setRef(generateRef(name))
    }, [setRef, generateRef, name])


    // When input onblur check validation
    const onBlur = (event) => {
        checkValidationAndSetErrors(event.target.value);
        handleSetIsRender(name, true);
    }

    // When input changed,check validation,set state,set input render
    const handleChange = event => {
        const inputValue = event.target.value;

        // send data to Form component
        onChange(name, inputValue);

        // update the component state
        setValue(inputValue)

        // set input rendered true in Form component
        handleSetIsRender(name, true);

        // check validation for input value
        checkValidationAndSetErrors(inputValue);
    };

    const checkValidationAndSetErrors = (inputValue) => {
        const check = checkValidation(inputValue);
        if (_.isEmpty(check))
            removeError(name)
        else
            handleSetErrors(name, check)
    }

    const checkValidation = (inputValue) => {
        if (validate) {
            const keys = Object.keys(validate);
            const errors = {}
            for (let i = 0; i < Object.keys(validate).length; i++) {
                const key = keys[i]
                const keyValue = typeof validate[key] === "object" ? validate[key]["value"] : validate[key];;
                const message = typeof validate[key] === "object" && validate[key]["message"] ? validate[key]["message"] : DefaultValidationMessage[key];
                if (key in ValidationHelper) {
                    const validationResponse = ValidationHelper[key](inputValue, keyValue)
                    if (!validationResponse) errors[key] = message;
                }
            }
            return errors;
        }
    }

    const getClassName = () => {
        if (!isRender[name]) return ""; // input not rendered.
        else {
            if (errors[name]) return "is-invalid"; // if input is rendered and has a errors
            else return "is-valid"; // if input is rendered and has not a errors
        }
    }

    // get input types
    const getInput = () => {
        switch (type) {
            case "input":
                return (
                    <input
                        type="text" //for now i just allowed this type
                        name={name}
                        className={"form-control " + getClassName()}
                        onBlur={onBlur}
                        onChange={handleChange}
                        placeholder={placeholder} />
                )
            case "textarea":
                return (
                    <textarea
                        name={name}
                        className={"form-control " + getClassName()}
                        onBlur={onBlur}
                        onChange={handleChange}
                        placeholder={placeholder}
                        rows={rows}
                        cols={cols}
                    ></textarea>
                )
            case "select":
                return (
                    <select
                        name={name}
                        className={"form-control " + getClassName()}
                        onBlur={onBlur}
                        onChange={handleChange}
                    >
                        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                )
            default:
                return <p>Error! This is type is not supported.Be sure type is input,select,textarea</p>;
        }
    }

    // for accessing data in parent component
    useImperativeHandle(ref, () => ({
        checkValidation,
        checkValidationAndSetErrors,
        value
    }));

    return (
        <React.Fragment>
            {getInput()}
            { showErrorLabel && <ErrorLabel formContext={formContext} name={name} />}
        </React.Fragment>
    )
}

Input.defaultProps = {
    className: "",
    type: "text",
    placeholder: "",
    rows: "4",
    cols: "50",
    options: []
};

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    validate: PropTypes.object,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
    options: PropTypes.array,
};

export default Input;


/*
<input
        name={name}
        className={"form-control " + getClassName()}
        onBlur={onBlur}
        onChange={handleChange}
        placeholder={placeholder} />
*/