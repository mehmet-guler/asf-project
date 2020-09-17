import React, { createContext, useState, useImperativeHandle } from 'react';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

export const FormContext = createContext();

function Form({ children, doIt, formRef, showErrorLabel, showStatusAlert }) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isRender, setIsRender] = useState({});
    const [showFormErrorAlert, setShowFormErrorAlert] = useState(false);
    const [showFormSuccessAlert, setShowFormSuccessAlert] = useState(false);

    /* generate ref for children.Because before form submitting,should check validation. */
    /* to reach childrens value */
    const references = {};
    const generateRef = (id) => {
        if (!references.hasOwnProperty(id)) {
            const ref = React.createRef();
            references[id] = ref;
            return ref;
        }
    }

    /* FORM VALUES CHANGE */
    const handleFieldChange = (fieldId, value) => {
        setValues({ ...values, [fieldId]: value });
    };

    /* FORM ERRORS */
    const handleSetErrors = (fieldId, value) => {
        setErrors({ ...errors, [fieldId]: value });
    };

    /* Input had errors but then input value not wrong,should remove input error  */
    const removeError = (key) => {
        setErrors(_.omit(errors, [key]))
    }

    /* When form submitting.Before the form submitting,should doing check validation */
    const handleSubmit = (event) => {
        event.preventDefault();
        let __errors = {}
        for (let refName in references) {
            const reference = references[refName].current;
            const checkValidation = reference.checkValidation(reference.value)
            if (!_.isEmpty(checkValidation)) __errors = { ...__errors, [refName]: checkValidation }
        }
        setErrors(__errors);
        if (!_.isEmpty(__errors)) {
            setShowFormSuccessAlert(false);
            setShowFormErrorAlert(true)
        }
        else {
            setShowFormErrorAlert(false);
            setShowFormSuccessAlert(true);
            doIt(values);
        }
    }

    // control for which input is rendered.
    const handleSetIsRender = (fieldId, value) => {
        setIsRender({ ...isRender, [fieldId]: value });
    };

    // for accessing data in parent component
    useImperativeHandle(formRef, () => ({
        values,
        errors,
        isRender
    }));

    return (
        <React.Fragment>

            {/* FORM */}
            <form onSubmit={handleSubmit} autoComplete="off" >
                <FormContext.Provider
                    value={{
                        values,
                        onChange: handleFieldChange,
                        handleSetErrors,
                        generateRef,
                        removeError,
                        errors,
                        showErrorLabel: showErrorLabel,
                        handleSetIsRender,
                        isRender
                    }}
                >
                    {children}
                </FormContext.Provider>
            </form>
            {/* END OF FORM */}

            {/* FOR ALERT */}
            {showStatusAlert &&
                <React.Fragment>
                    {showFormErrorAlert &&
                        <Alert variant="danger" onClose={() => setShowFormErrorAlert(false)} dismissible>
                            <Alert.Heading> You got an error!</Alert.Heading>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Alert>}

                    {showFormSuccessAlert &&
                        <Alert variant="success" onClose={() => setShowFormSuccessAlert(false)} dismissible>
                            <Alert.Heading>Form submit succeed</Alert.Heading>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Alert>}
                </React.Fragment>
            }
            {/* END OF FOR ALERT */}

        </React.Fragment>
    )
}

Form.defaultProps = {
    className: "",
    showErrorLabel: true,
    showStatusAlert: true
};

Form.propTypes = {
    className: PropTypes.string,
    showErrorLabel: PropTypes.bool,
    showStatusAlert: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    doIt:PropTypes.func.isRequired
};
export default Form;