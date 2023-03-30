import React, { useState, useEffect } from 'react'
import './WelcomePage.scss'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import PrimarySearchAppBar from "../NavBar/NavBar";
import Footer from '../Footer/Footer';
import { useSession } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import dayjs from 'dayjs';
import { styled, TextField, Button } from "@mui/material";


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

const CssTextField = styled(TextField) ({
  '& label.Mui-focused': {
    color: "black",
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: "#ff7961",
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "black",
    },
    '&.Mui-focused fieldset': {
      borderColor: "#ff7961",
    },
  },
});

const LoginButton = styled(Button) ({
  "&.MuiButton-root": {
    backgroundColor: "#ff7961"
  },
  "&.MuiButton-text": {
    color: "white"
  },
});

interface gapiType {
  summary: string,
  date: string,
  id: string,
}

function WelcomePage() {
  const [testClicked, setTestClicked] = useState(false);
  const [WDClicked, setWDClicked] = useState(false);
  const [topicClicked, setTopicClicked] = useState(false);
  const [HLClicked, setHLClicked] = useState(false);
  const [calendarClicked, setCalendarClicked] = useState(false);
  const [eventsClicked, setEventsClicked] = useState(false);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [weeksEvents, setWeeksEvents] = useState<gapiType[]>();
  const [dayEvents, setDayEvents] = useState<gapiType[]>();
  const [reFetchCalendar, setReFetchCalendar] = useState(false);

  const session = useSession();
  const name = session?.user.email?.split('.')[0];

  async function createCalendarEvent() {
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session?.provider_token
      },
      body: JSON.stringify(event)
    }).then((data) => {
      console.log(data);
      return data.json();
    }).then((data) => {
      console.log(data);
    });
    setReFetchCalendar(!reFetchCalendar);
  }

  async function deleteEvent(id: string) {
    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization':'Bearer ' + session?.provider_token
      },
    }).then((data) => {
      console.log(data);
    }).then((data) => {
      console.log(data);
    });
    setReFetchCalendar(!reFetchCalendar);
  }

  useEffect(() => {
    async function getCalendarEventWeek() {
      if (session?.provider_token) {
        console.log("Creating calendar event");
        const startOfWeek = dayjs().startOf('week');
        const endOfWeek = dayjs().endOf('week');
        const params = new URLSearchParams({
          "timeMin": startOfWeek.toISOString(),
          "timeMax": endOfWeek.toISOString(),
          "singleEvents": true.toString(),
          "orderBy": 'startTime',
        });
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
          method: "GET",
          headers: {
            'Authorization':'Bearer ' + session?.provider_token
          }
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data);
          const weeksEvents: gapiType[] = data.items.map((item: any) => {
            return {
              summary: item.summary,
              date: item.start.dateTime,
              id: item.id,
            };
          });
        
          setWeeksEvents(weeksEvents);
        });
      }
    }
    getCalendarEventWeek()
  }, [session?.provider_token, reFetchCalendar]);

  useEffect(() => {
    async function getCalendarEventDay() {
      if (session?.provider_token) {
        console.log("Creating calendar event");
        const startOfDay = dayjs().startOf('day');
        const endOfDay = dayjs().endOf('day');
        const params = new URLSearchParams({
          "timeMin": startOfDay.toISOString(),
          "timeMax": endOfDay.toISOString(),
          "singleEvents": true.toString(),
          "orderBy": 'startTime',
        });
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
          method: "GET",
          headers: {
            'Authorization':'Bearer ' + session?.provider_token
          }
        }).then((data) => {
          return data.json();
        }).then((data) => {
          const dayEvents: gapiType[] = data.items.map((item: any) => {
            return {
              summary: item.summary,
              date: item.start.dateTime,
              id: item.id,
            };
          });
        
          setDayEvents(dayEvents);
        });
      }
    }
    getCalendarEventDay()
  }, [session?.provider_token, reFetchCalendar]);

  return (
  <>
    <PrimarySearchAppBar />
    <div className='welcome'>
      <h1 className='welcome-title'>{`welcome back ${name}`}</h1>
    </div>
    <StyledBox sx={{ flexGrow: 1 }} className='box'>
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={8} lg={5}>
          <Item onClick={() => setTestClicked(!testClicked)} className={`testresult ${testClicked ? 'item-clicked' : ''}`}>
          <h2 className='testresult-title'>Weekend Test Results</h2>
          <table className='testresult-table'>
            <tbody>
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
            </tbody>
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
        <Grid xs={12} sm={12} md={6} lg={6}>
          <Item onClick={() => setHLClicked(!HLClicked)} className={`highlight ${HLClicked ? 'item-clicked' : ''}`}>
            <h2 className='highlight-title'>Schedule For Today</h2>
            {dayEvents && dayEvents.length !== 0 ?
              <div className='highlight-schedule'>
                {dayEvents!.map((event: gapiType, index) => {
                const date = new Date(event.date).toLocaleString().toString().split(',');
                  return (
                    <h4 className='highlight-schedule-el'>{`${date[1].split(':').slice(0,2).join(':')} - ${event.summary}`}</h4>
                  )
                })}
              </div>
              :
              <p className='highlight-empty'>No appointments today!</p>
            }
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={6}>
          <Item onClick={() => setCalendarClicked(!calendarClicked)} className={`calendar ${calendarClicked ? 'item-clicked' : ''}`}>
            <h2 className='calendar-title'>Schedule this week</h2>
            {weeksEvents && weeksEvents.length !== 0 ?
              <div className='calendar-schedule'>
              {weeksEvents.map((event: gapiType, index) => {
                const date = new Date(event.date).toLocaleString().toString().split(',');
                return (
                <ul className='calendar-schedule-box'>
                  <li className='calendar-schedule-box-day calendar-schedule-box-el'>{`${date[0].split('/').slice(0,2).join('/')}`}</li>
                  <li className='calendar-schedule-box-time calendar-schedule-box-el'>{`${date[1].split(':').slice(0,2).join(':')}`}</li>
                  <li className='calendar-schedule-box-summary calendar-schedule-box-el'>{event.summary}</li>
                  <button className='calendar-schedule-box-button' onClick={() => deleteEvent(event.id)}>Delete</button>
                </ul>
                )
              })}
            </div>
            :
            <h2 className='calendar-empty'>There is nothing in your calendar this week</h2>
            }
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Item onClick={() => setEventsClicked(!eventsClicked)} className={`events ${eventsClicked ? 'item-clicked' : ''}`}>
            <h2 className='events-title'>Set a new event for your Calendar</h2>
            <div className='events-timeset'>
              <div className='events-timeset-input'>
                <p className='events-timeset-input-title'>Start of your event</p>
                <DateTimePicker onChange={setStart} value={start} />
              </div>
              <div className='events-timeset-input'>
                <p className='events-timeset-input-title'>End of your event</p>
                <DateTimePicker onChange={setEnd} value={end} />
              </div>
            </div>
            <div className='events-summary'>
              <CssTextField label="Event name" variant='standard' onChange={(e) => setEventName(e.target.value)}/>
              <CssTextField label="Event description" variant='standard' onChange={(e) => setEventDescription(e.target.value)}/>
            </div>
            <br />
            <LoginButton onClick={() => createCalendarEvent()}>Create Event</LoginButton>
          </Item>
        </Grid>
      </Grid>
    </StyledBox>
    <Footer />
  </>
  )
}

export default WelcomePage