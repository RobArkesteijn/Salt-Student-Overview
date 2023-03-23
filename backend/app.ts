import express from 'express';
import pool from './database/db';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.connect();

app.get('/api/students', (req, res) => {
  pool.query('SELECT * FROM public."Products"')
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log(error);
      res.send(500).send('An error occured while retrieving the Student data');
    });
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));