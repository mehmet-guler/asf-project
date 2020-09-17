import React from 'react';
// import Header from './Components/header/Header';
// import Footer from './Components/footer/Footer';
// import Content from './Components/contents';
import Form from './Components/genericForm/Form';
import Input from './Components/genericForm/Input';

function App() {

  // name must be unique
  return (
    <React.Fragment>

      <Form doIt={() => console.log("ÇALIŞACAK")} showErrorLabel={true} showStatusAlert={true}>
        <Input type="input" name="name" validate={{ customValidate: (inputValue) => inputValue === "a" }} />
        {/* <Input name="name" validate={{ customValidate: { value: (inputValue) => inputValue === "a", message: "Csasds" }, minLength: { value: 3, message: "MİNNNNN" } }} /> */}
        {/* <Input name="name" validate={{ required: true, minLength: { value: 5, message: "Minnn" } }} /> */}
        <Input type="input" name="surname" validate={{ minLength: { value: 5, message: "Minnnaaa" } }} />
        <Input type="textarea" name="description" validate={{ minLength: { value: 15, message: "Textarea Minn length" } }} rows="3" cols="50" />
        <Input type="select" name="carType" validate={{ required:{value:true,message:"SELECT REQU"} }} options={[{ value: "", label: "Please Select Car Type" }, { value: "volvo", label: "Volvo" }, { value: "citroen", label: "Citroen" }, { value: "mercedes", label: "Mercedes" }]} />

        <button type="submit" className="btn btn-danger" >Submit</button>

      </Form>

      {/* <Header />
      <Content />
      <Footer /> */}
    </React.Fragment>
  );
}

export default App;
