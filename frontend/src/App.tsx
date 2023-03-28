import React from 'react';
import './App.scss';
import PrimarySearchAppBar from "./components/NavBar/NavBar";
import TestResults from './components/TestResults/TestResults';
import Login from './components/Login/Login';


function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <TestResults />
      {/* <Login/> */}
    </>
  )

}

export default App;
