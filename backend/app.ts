/* eslint-disable import/prefer-default-export */
import express from 'express';
import pool from './database/db';
import calendarRouter from './calendar';
import cors from 'cors';


export const app = express();
app.use(cors());
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pool.connect();

// app.get('/api/students', (req, res) => {
//   pool.query('SELECT * FROM public."Products"')
//     .then(result => res.send(result.rows))
//     .catch(error => {
//       console.log(error);
//       res.send(500).send('An error occurred while retrieving the Student data');
//     });
// });

// Register the calendar router
app.use('/', calendarRouter);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
