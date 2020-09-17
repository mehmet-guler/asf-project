import React from 'react'

function ErrorLabel({formContext,name}) {

    const getError = () => {
        const fieldError = formContext.errors[name]
        if (fieldError) {
            for (let key in fieldError) {
                return fieldError[key];
            }
        }
        return false;
    }

    return (
        getError() && < small className="form-text text-danger" >{getError()}</small>
    )
}
export default ErrorLabel;