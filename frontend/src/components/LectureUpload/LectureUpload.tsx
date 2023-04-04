/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-useless-concat */
import React, {useState} from 'react'
import PrimarySearchAppBar from "../NavBar/NavBar";
import Footer from '../Footer/Footer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, InputLabel, NativeSelect, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import './LectureUpload.scss'

function LectureUpload() {
  const supabase = useSupabaseClient();
  const [pdfName, setPdfName] = useState('');
  const [weekNumber, setWeekNumber] = useState('Week One');
  const [day, setDay] = useState('Mon');

  async function uploadSlides() {
    let fileInput = document.getElementById('file-input') as HTMLInputElement;
    let file = fileInput.files![0];
    
    const { data, error } = await supabase
      .storage
      .from('lectureslides')
      .upload(weekNumber + '-' + day + '-' + pdfName + '.pdf', file);
    if (error) {
      console.log(error);
    } else {
      console.log('data', data);
      toast.success('Lecture has been uploaded');
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <form className='form' method="post" onSubmit={(e) => {
          e.preventDefault();
          uploadSlides();
        }}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" label="File Name" variant="standard" onChange={(e) => setPdfName(e.target.value)}/>
          </Box>
        <InputLabel id="demo-simple-select-label">Week</InputLabel>
          <NativeSelect
            defaultValue={1}
            inputProps={{
              name: 'week',
              id: 'uncontrolled-native',
            }}
            onChange={(e) => setWeekNumber(e.target.value)}
          >
            <option value={'Week 1'}>Week One</option>
            <option value={'Week 2'}>Week Two</option>
            <option value={'Week 3'}>Week Three</option>
            <option value={'Week 4'}>Week Four</option>
            <option value={'Week 5'}>Week Five</option>
            <option value={'Week 6'}>Week Six</option>
            <option value={'Week 7'}>Week Seven</option>
            <option value={'Week 8'}>Week Eight</option>
            <option value={'Week 9'}>Week Nine</option>
            <option value={'Week 10'}>Week Ten</option>
            <option value={'Week 11'}>Week Eleven</option>
            <option value={'Week 12'}>Week Twelve</option>
            <option value={'Week 13'}>Week Thirteen</option>
            
          </NativeSelect>
          <InputLabel id="demo-simple-select-day-label">Week</InputLabel>
          <NativeSelect
            defaultValue={1}
            inputProps={{
              name: 'day',
              id: 'uncontrolled-native-day',
            }}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value={'Monday'}>Monday</option>
            <option value={'Tuesday'}>Tuesday</option>
            <option value={'Wednesday'}>Wednesday</option>
            <option value={'Thursday'}>Thursday</option>
            <option value={'Friday'}>Friday</option>
            
          </NativeSelect>
        <input className='form-input' id="file-input" type="file" accept="application/pdf"/>
        <button className='form-button' type='submit'>Upload File</button>
      </form>
      <Footer />
    </>
  )
}

export default LectureUpload