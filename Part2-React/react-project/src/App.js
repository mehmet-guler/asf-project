import React from 'react';
// import Header from './Components/header/Header';
// import Footer from './Components/footer/Footer';
// import Content from './Components/contents';
import Form from './Components/genericForm/Form';
import Input from './Components/genericForm/inputTypes/Input';

function App() {

  // name must be unique
  return (
    <React.Fragment>

      <Form doIt={()=>console.log("ÇALIŞACAK")}>
        <Input name="name" validate={{ customValidate: (inputValue) => inputValue === "a" ,minLength:4}} showErrorLabel={true} />
        {/* <Input name="name" validate={{ customValidate: { value: (inputValue) => inputValue === "a", message: "Csasds" }, minLength: { value: 3, message: "MİNNNNN" } }} /> */}
        {/* <Input name="name" validate={{ required: true, minLength: { value: 5, message: "Minnn" } }} /> */}
        <Input name="surname" validate={{ minLength: { value: 5, message: "Minnnaaa" } }} />
      </Form>

      {/* <Header />
      <Content />
      <Footer /> */}
    </React.Fragment>
  );
}

export default App;
