import React, { createContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';

export const FormContext = createContext();

function Form(props) {

    const [showFormErrorAlert, setShowFormErrorAlert] = useState(false);
    const [showFormSuccessAlert, setShowFormSuccessAlert] = useState(false);

    const references = {};

    const generateRef = (id) => {
        if (!references.hasOwnProperty(id)) {
            const ref = React.createRef();
            references[id] = ref;
            //setAa({ ...aa, [id]: ref })
            return ref;
        }
    }

    // const getRef = (id) => {
    //     return references[id];
    // }

    const [values, setValues] = useState({});
    const handleFieldChange = (fieldId, value) => {
        setValues({ ...values, [fieldId]: value });
    };

    const [errors, setErrors] = useState({}); // first value will be null.If initial state is null,we can first className set null
    const handleSetErrors = (fieldId, value) => {
        setErrors({ ...errors, [fieldId]: value });
    };

    const removeError = (key) => {
        setErrors(_.omit(errors, [key]))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //references
        let __errors = {}
        for (let refName in references) {
            const reference = references[refName].current;
            const checkValidation = reference.checkValidation(reference.value)
            if (!_.isEmpty(checkValidation)) __errors = { ...__errors, [refName]: checkValidation }
            // console.log("CHECK", checkValidation)
        }
        setErrors(__errors);
        if (!_.isEmpty(errors)) {
            setShowFormSuccessAlert(false);
            setShowFormErrorAlert(true)
        }
        else {
            setShowFormErrorAlert(false);
            setShowFormSuccessAlert(true);
            props.doIt();
        }

        // references.map(reference => {
        //     const ref = reference.current;
        //     return ref.checkValidation(ref.value);
        // })
    }

    // console.log("VALUEs", values)


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} autoComplete="off" >
                <FormContext.Provider
                    value={{
                        values,
                        onChange: handleFieldChange,
                        handleSetErrors,
                        //validation: (a) => console.log("a", a),
                        generateRef,
                        removeError,
                        errors,
                        showErrorLabel: props.showErrorLabel
                    }}
                >
                    {props.children}
                </FormContext.Provider>
            </form>
            {
                props.showStatusAlert &&
                <React.Fragment>
                    {showFormErrorAlert &&
                        <Alert variant="danger" onClose={() => setShowFormErrorAlert(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Alert>}

                    {showFormSuccessAlert &&
                        <Alert variant="success" onClose={() => setShowFormSuccessAlert(false)} dismissible>
                            <Alert.Heading>Form submit succeed</Alert.Heading>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Alert>}
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Form;



// const getFormFields = () => {
//     return React.Children.map(children, child => {
//       const type =
//         typeof child.type === "string" ? child.type : child.type.name;
//       if (FORMTYPES[type.toUpperCase()]) {
//         // child'ın tipi FORMGROUP yada FORMCHECK(yeni oluşturulacak tipler FORMTYPES içine eklenecek) ise yeni element oluşturup propsları ve register'ı gönder
//         return React.createElement(child.type, {
//           ...{
//             ...child.props,
//             register: register,
//             control: control,
//             errors: errors,
//             onLoadValidation:onLoadValidation,
//             key: child.props.name
//           }
//         });
//       } else {
//         return child;
//       }
//     });
//   };