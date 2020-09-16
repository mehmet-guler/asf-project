import React, { createContext, useState, useEffect } from 'react';
import _ from 'lodash';

export const FormContext = createContext();

function Form(props) {

    useEffect(() => {
        console.log("geldi")

    }, [])


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
        console.log("1", fieldId)
        console.log("2", value)
        setErrors({ ...errors, [fieldId]: value });
    };

    const removeError = (key) => {
        setErrors(_.omit(errors, [key]))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //references
        console.log("references", references)
        console.log("values", values)
        let __errors = {}
        for (let refName in references) {
            console.log("refname", refName)
            const reference = references[refName].current;
            const checkValidation = reference.checkValidation(reference.value)
            console.log("CHECKL", checkValidation)
            if (!_.isEmpty(checkValidation)) __errors = { ...__errors, [refName]: checkValidation }
            // console.log("CHECK", checkValidation)
        }
        setErrors(__errors);
        console.log("errors", errors)
        if (!_.isEmpty(errors)) console.log("Hata mevcut")
        else props.doIt();

        // references.map(reference => {
        //     const ref = reference.current;
        //     return ref.checkValidation(ref.value);
        // })
    }

    // console.log("VALUEs", values)
    console.log("Errors", errors)


    return (
        <React.Fragment>
            <button onClick={() => console.log("err", errors)}>Tıkla2</button>
            <form onSubmit={handleSubmit}>
                <button onClick={() => console.log("REF", references)}>Tıkla</button>
                <FormContext.Provider
                    value={{
                        values,
                        onChange: handleFieldChange,
                        handleSetErrors,
                        //validation: (a) => console.log("a", a),
                        generateRef,
                        removeError,
                        errors
                    }}
                >
                    {props.children}
                    <button type="submit" >Submit</button>
                </FormContext.Provider>
            </form>
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