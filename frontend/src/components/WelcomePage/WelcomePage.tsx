import React, { useState } from 'react'
import './WelcomePage.scss'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const StyledBox = styled(Box)({
  margin: '20px 16px 40px 16px',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f8f8f8',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: '0.2s ease-in-out',
  border: 'solid 1px transparent',
  boxShadow: '0px 2px 1px -1px rgba(255,121,97), 0px 1px 1px 0px rgba(255,121,97), 0px 1px 3px 0px rgba(255,121,97)',
  '@media (min-width: 900px)': {
    '&:hover': {
      border: 'solid 1px black',
      boxShadow: '5px 5px 0 0 rgb(255,121,97)',
      color: theme.palette.text.primary,
      backgroundColor: 'white',
    },
  },
  '&.item-clicked': {
    border: 'solid 1px black',
    boxShadow: '5px 5px 0 0 rgb(255,121,97)',
    color: theme.palette.text.primary,
    backgroundColor: 'white',
  },
}));

function WelcomePage() {
  const [testClicked, setTestClicked] = useState(false);
  const [WDClicked, setWDClicked] = useState(false);
  const [topicClicked, setTopicClicked] = useState(false);
  const [HLClicked, setHLClicked] = useState(false);
  const [calenderClicked, setCalenderClicked] = useState(false);

  return (
  <>
    <div className='welcome'>
      <h1 className='welcome-title'>welcome back user</h1>
    </div>
    <StyledBox sx={{ flexGrow: 1 }} className='box'>
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={8} lg={5}>
          <Item onClick={() => setTestClicked(!testClicked)} className={`testresult ${testClicked ? 'item-clicked' : ''}`}>
          <h2 className='testresult-title'>Weekend Test Results</h2>
          <table className='testresult-table'>
            <tr className='testresult-table-row'>
              <td className='testresult-table-row-el testresult-table-row-el-green'>Week 1</td>
              <td className='testresult-table-row-el testresult-table-row-el-green'>Week 4</td>
              <td className='testresult-table-row-el testresult-table-row-el-green'>Week 7</td>
            </tr>
            <tr className='testresult-table-row'>
              <td className='testresult-table-row-el testresult-table-row-el-green'>Week 2</td>
              <td className='testresult-table-row-el testresult-table-row-el-green'>Week 5</td>
              <td className='testresult-table-row-el testresult-table-row-el-undefined'>Week 8</td>
            </tr>
            <tr className='testresult-table-row'>
              <td className='testresult-table-row-el testresult-table-row-el-green'>Week 3</td>
              <td className='testresult-table-row-el testresult-table-row-el-red'>Week 6</td>
              <td className='testresult-table-row-el testresult-table-row-el-undefined'>Week 9</td>
            </tr>
          </table>
          </Item>
        </Grid>
        <Grid xs={12} sm={4} md={4} lg={2}>
          <Item onClick={() => setWDClicked(!WDClicked)} className={`weekdate ${WDClicked ? 'item-clicked' : ''}`}>
            <h3 className='weekdate-date'>Week</h3>
            <h1 className='weekdate-weeknumber'>8</h1>
            <h4 className='weekdate-day'>Friday</h4>
          </Item>
        </Grid>
        <Grid xs={12} sm={8} md={6} lg={5}>
          <Item onClick={() => setTopicClicked(!topicClicked)} className={`topic ${topicClicked ? 'item-clicked' : ''}`}>
            <h2 className='topic-title'>This Weeks Topics</h2>
            <div className='topic-container'>
              <ul className='topic-container-list'>
                <li className='topic-container-list-item'>React</li>
                <li className='topic-container-list-item'>Components</li>
                <li className='topic-container-list-item'>Hooks</li>
              </ul>
              <ul className='topic-container-list'>
                <li className='topic-container-list-item'>Testing</li>
                <li className='topic-container-list-item'>Classes</li>
                <li className='topic-container-list-item'>Routing</li>
              </ul>
            </div>
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Item onClick={() => setHLClicked(!HLClicked)} className={`highlight ${HLClicked ? 'item-clicked' : ''}`}>
            <h2 className='highlight-title'>Schedule For Today</h2>
            <div className='highlight-title-schedule'>
              <h4 className='highlight-title-schedule-el'>09:00 - Morning Lecture JSFS Area</h4>
              <h4 className='highlight-title-schedule-el'>13:30 - Mock Interview</h4>
            </div>
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={8}>
          <Item onClick={() => setCalenderClicked(!calenderClicked)} className={`highlight ${calenderClicked ? 'item-clicked' : ''}`}>
            <h1 className='calender-title'>This is the container for the Calender</h1>
          </Item>
        </Grid>
      </Grid>
    </StyledBox>
  </>
  )
}

export default WelcomePage