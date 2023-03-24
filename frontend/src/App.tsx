import React from 'react';
import './App.scss';
import PrimarySearchAppBar from "./components/NavBar/NavBar";
import WelcomePage from './components/WelcomePage/WelcomePage';

function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <WelcomePage />
    </>
  );

}

export default App;
