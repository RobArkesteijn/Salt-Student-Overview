import { google } from 'googleapis';
import express from 'express';
import dayjs from 'dayjs';
import bodyParser from 'body-parser';
import cors from 'cors';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

const calendar = google.calendar({
  version: 'v3',
  auth: 'AIzaSyBrJGYTR44LeqBS1rkw1goLSn5yCZ3Vi88',
});

const oauth2Client = new google.auth.OAuth2(
  '445032506225-61ib9dgpvug2ghcj8cpqtvsbesnhlr52.apps.googleusercontent.com',
  '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',
  'http://localhost:8080/api/gapi',
);

const scopes = [
  'https://www.googleapis.com/auth/calendar',
];

router.get('/calendar', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

router.get('/api/gapi', async (req, res) => {
  const { code } = req.query as { code: string };
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send({
    message: 'You have succesfully logged in',
  });
});

router.get('/api/gapi/info', async (req, res) => {
  await calendar.events.insert({
    calendarId: 'primary',
    auth: oauth2Client,
    requestBody: {
      summary: 'This is a test event',
      description: 'Some event that is very important',
      start: {
        dateTime: dayjs(new Date()).add(1, 'day').toISOString(),
        timeZone: 'Europe/Amsterdam',
      },
      end: {
        dateTime: dayjs(new Date()).add(1, 'day').add(1, 'hour').toISOString(),
        timeZone: 'Europe/Amsterdam',
      },
    },
  });
  res.send({ message: 'done' });
});

router.get('/api/gapi/events', async (req, res) => {
  const accessToken = req.query.access_token as string;
  console.log(accessToken);
  oauth2Client.setCredentials({ access_token: accessToken });
  const startOfWeek = dayjs().startOf('week');
  const endOfWeek = dayjs().endOf('week');

  const { data } = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startOfWeek.toISOString(),
    timeMax: endOfWeek.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    auth: oauth2Client,
  });

  const events = data.items?.map(event => ({
    id: event.id,
    summary: event.summary,
    start: event.start?.dateTime,
    end: event.end?.dateTime,
  }));

  res.send(events);
});

export default router;
