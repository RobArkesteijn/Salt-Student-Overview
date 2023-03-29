import express from 'express';
import db from './database';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pool.connect();

app.get('/api/users', async (req, res) => {
  const users = await db.getAllUsers();
  res.json(users);
});

app.get('/api/weekendtest', async (req, res) => {
  const weekendTest = await db.getAllWeekendTest();
  res.json(weekendTest);
});

app.get('/api/students', async (req, res) => {
  const students = await db.getAllStudents();
  res.json(students);
});

app.get('/api/courses', async (req, res) => {
  const courses = await db.getAllCourses();
  res.json(courses);
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
