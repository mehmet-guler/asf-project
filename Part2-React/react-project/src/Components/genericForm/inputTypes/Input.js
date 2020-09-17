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
        checkValidationAndSetErrors(inputValue)
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

    return (
        <React.Fragment>
            <input
                name={props.name}
                className="form-control"
                onBlur={(event) => checkValidationAndSetErrors(event.target.value)}
                onChange={handleChange}
                placeholder={props.placeholder} />
            {/* <input onBlur={() => onSetName(name)} type="text" className={"form-control"} placeholder="Name" value={name} onChange={(event) => onSetName(event.target.value)} /> */}
            { formContext.showErrorLabel && getError() && < small className="form-text text-danger" >{getError()}</small>}
        </React.Fragment>
    )
}

export default Input;