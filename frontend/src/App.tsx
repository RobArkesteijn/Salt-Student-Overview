import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import ProfileSetting from './components/ProfileSetting/ProfileSetting';
import TestResults from './components/TestResults/TestResults';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileSetting />} />
        <Route path="/results" element={<TestResults />} />
      </Routes>
    </>
  );
}

export default App;
