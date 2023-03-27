import React from 'react';
import './App.scss';
import PrimarySearchAppBar from "./components/NavBar/NavBar";
import WelcomePage from './components/WelcomePage/WelcomePage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <WelcomePage />
      <br />
      <Footer />
    </>
  );

}

export default App;
