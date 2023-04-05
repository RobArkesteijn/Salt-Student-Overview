import React, { useState } from 'react'
import PrimarySearchAppBar from "../NavBar/NavBar";
import './InstructorPage.scss';
import StudentInfo from '../StudentInfo/StudentInfo';
import LectureUpload from '../LectureUpload/LectureUpload';

function InstructorPage() {
	const [panelState, setPanelState] = useState('studentInfo');

  return (
    <>
      <PrimarySearchAppBar />
      <div className='updateswitch'>
        <ul className="updateswitch-list">
					<li className={`updateswitch-list-item ${panelState === 'studentInfo' ? 'active' : ''}`} onClick={() => setPanelState('studentInfo')}>Student Info</li>
          <li className={`updateswitch-list-item ${panelState === 'lectureUpload' ? 'active' : ''}`} onClick={() => setPanelState('lectureUpload')}>Lecture Upload</li>
        </ul>
      </div>
			{panelState === 'studentInfo' && <StudentInfo />}
			{panelState === 'lectureUpload' && <LectureUpload />}
    </>
  )
}

export default InstructorPage