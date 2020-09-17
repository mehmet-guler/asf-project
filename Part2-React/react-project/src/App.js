import React from 'react';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Content from './Components/contents';
import Form from './Components/genericForm/Form';
import Input from './Components/genericForm/inputTypes/Input';

function App() {

  // name must be unique
  return (
    <React.Fragment>

     

      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
}

export default App;
