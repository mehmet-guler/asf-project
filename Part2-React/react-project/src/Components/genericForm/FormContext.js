import React, { createContext, useState } from "react";

export const FormContext = createContext();

// This context provider is passed to any component requiring the context
export const FormProvider = ({ children }) => {
    const [name, setName] = useState("William");
    const [location, setLocation] = useState("Mars");

    return (
        <FormContext.Provider
            value={{
                name,
                location,
                setName,
                setLocation
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

// import React from 'react';

// const FormContext = React.createContext();

// export default FormContext;