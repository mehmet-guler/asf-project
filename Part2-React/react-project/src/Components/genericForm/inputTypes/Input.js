import React, { useContext, useImperativeHandle, useEffect, useState } from 'react'
import { FormContext } from '../Form';

import * as Validation from '../Validation';
import * as DefaultValidationMessage from '../DefaultValidationMessages';
import _ from 'lodash';

function Input(props) {

    const [value, setValue] = useState("")
    const [ref, setRef] = useState(null)

    const formContext = useContext(FormContext);


    const handleChange = event => {
        const inputValue = event.target.value;
        formContext.onChange(props.name, inputValue);
        setValue(inputValue)
        //validation
        //validation(event)
        formContext.handleSetIsRender(props.name, true);
        checkValidationAndSetErrors(inputValue);
        // console.log(checkValidation(event.target.value))
    };


    useImperativeHandle(ref, () => ({
        checkValidation,
        checkValidationAndSetErrors,
        value
    }));

    useEffect(() => {
        setRef(formContext.generateRef(props.name))
    }, [setRef, formContext, props.name])

    // onblur validation

    // value={formContext.values[props.name]}


    const checkValidation = (inputValue) => {
        if (props.validate) {
            const keys = Object.keys(props.validate);
            const errors = {}
            for (let i = 0; i < Object.keys(props.validate).length; i++) {
                const key = keys[i]
                const keyValue = typeof props.validate[key] === "object" ? props.validate[key]["value"] : props.validate[key];;
                const message = typeof props.validate[key] === "object" ? props.validate[key]["message"] : DefaultValidationMessage[key];
                if (key in Validation) {
                    const validationResponse = Validation[key](inputValue, keyValue)
                    if (!validationResponse) errors[key] = message;
                }
            }
            return errors;
        }
    }

    const checkValidationAndSetErrors = (inputValue) => {
        const check = checkValidation(inputValue);
        if (_.isEmpty(check))
            formContext.removeError(props.name)
        else
            formContext.handleSetErrors(props.name, check)
    }

    const getError = () => {
        const fieldError = formContext.errors[props.name]
        if (fieldError) {
            for (let key in fieldError) {
                return fieldError[key];
            }
        }
        return false;
    }

    const onBlur = (event) => {
        checkValidationAndSetErrors(event.target.value);
        formContext.handleSetIsRender(props.name, true);
    }

    const getClassName = () => {
        // if input is rendered and has a errors
        if (!formContext.isRender[props.name]) return "";
        else {
            if (formContext.errors[props.name]) return "is-invalid";
            else return "is-valid";
        }
    }

    const getInput = () => {
        switch (props.type) {
            case "input":
                return (<input
                    name={props.name}
                    className={"form-control " + getClassName()}
                    onBlur={onBlur}
                    onChange={handleChange}
                    placeholder={props.placeholder} />)
            case "textarea":
                return (
                    <textarea
                        name={props.name}
                        className={"form-control " + getClassName()}
                        onBlur={onBlur}
                        onChange={handleChange}
                        placeholder={props.placeholder}
                        rows={props.rows}
                        cols={props.cols}
                    ></textarea>
                )
            case "select":
                return (
                    <select
                        name={props.name}
                        className={"form-control " + getClassName()}
                        onBlur={onBlur}
                        onChange={handleChange}
                    >
                        {props.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                )
            default:
                return <p>Error! This is type is not supported.Be sure type is input,select,textarea</p>;
        }
    }

    return (
        <React.Fragment>
            {getInput()}
            {/* <input
                name={props.name}
                className={"form-control " + getClassName()}
                onBlur={onBlur}
                onChange={handleChange}
                placeholder={props.placeholder} /> */}
            { formContext.showErrorLabel && getError() && < small className="form-text text-danger" >{getError()}</small>}
        </React.Fragment>
    )
}

export default Input;