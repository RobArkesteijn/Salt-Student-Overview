/* eslint-disable import/prefer-default-export */
import express from 'express';
import cors from 'cors';
import db from './database';

export const app = express();
app.use(cors());
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/api/mobusers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mobUsers = await db.findUsersByMobId(id);
    if (!mobUsers) {
      res.status(404).json({ message: 'not found' });
    } else {
      res.json(mobUsers);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/courseusers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const courseUsers = await db.findCoursesById(id);
    if (!courseUsers) {
      res.status(404).json({ message: 'not found' });
    } else {
      res.json(courseUsers);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
