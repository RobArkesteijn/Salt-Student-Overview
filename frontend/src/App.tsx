import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import ProfileSetting from './components/ProfileSetting/ProfileSetting';
import TestResults from './components/TestResults/TestResults';
import LectureSlides from './components/LectureSlides/LectureSlides';
import LectureUpload from './components/LectureUpload/LectureUpload';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileSetting />} />
        <Route path="/results" element={<TestResults />} />
        <Route path="/lectures" element={<LectureSlides />} />
        <Route path="/instructors" element={<LectureUpload />} />
      </Routes>
    </>
  );
}

export default App;
