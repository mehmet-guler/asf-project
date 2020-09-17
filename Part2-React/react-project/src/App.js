import React from 'react';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Content from './Components/contents';

function App() {

  return (
    <React.Fragment>
      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
}

export default App;
