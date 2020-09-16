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
        console.log("girdi")
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
                // console.log("key", key)
                // console.log("keyValue", keyValue)
                // console.log("message", message)
                // console.log(typeof props.validate[key])
                if (key in Validation) {
                    const validationResponse = Validation[key](inputValue, keyValue)
                    if (!validationResponse) errors[key] = message;
                }

                console.log("errors", errors)
                // //break;
            }
            return errors;
        }
    }
    // console.log(props.validate(event.target.value))

    const checkValidationAndSetErrors = (inputValue) => {
        const check = checkValidation(inputValue);
        if (_.isEmpty(check))
            formContext.removeError(props.name)
        else
            formContext.handleSetErrors(props.name, check)
    }

    const getError = () => {
        console.log("errors", formContext.errors[props.name])
        const fieldError = formContext.errors[props.name]
        if (fieldError) {
            
        }
        return false;
    }


    // const getError = (name) => {
    //     if (errors.length > 0) {
    //         const error = errors.filter(error => error.name === name);
    //         if (error.length > 0) return error;
    //         else return false
    //     }
    //     return false
    // }

    
    console.log("INPUT errors", formContext.errors[props.name])

    return (
        <React.Fragment>
            <button className="btn btn-primary" onClick={getError}>TIKLA 3</button>
            <input name={props.name} onBlur={(event) => checkValidationAndSetErrors(event.target.value)} onChange={handleChange} />
            {/* <input onBlur={() => onSetName(name)} type="text" className={"form-control"} placeholder="Name" value={name} onChange={(event) => onSetName(event.target.value)} /> */}
            {/* { props.showErrorLabel &&  getError() && < small className="form-text text-danger" >{errors(props.name)[0].message}</small>}  */}
        </React.Fragment>
    )
}

export default Input;