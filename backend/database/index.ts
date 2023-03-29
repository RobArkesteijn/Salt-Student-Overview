import db from './db';

const getAllUsers = async () => {
  const user = await db.getAllUsers();
  return user;
};

const getAllWeekendTest = async () => {
  const weekendTest = await db.getAllWeekendTest();
  return weekendTest;
};

const getAllStudents = async () => {
  const students = await db.getAllStudents();
  return students;
};

const getAllCourses = async () => {
  const courses = await db.getAllCourses();
  return courses;
};

const index = () => console.log('test');

export default {
  index,
  getAllUsers,
  getAllWeekendTest,
  getAllStudents,
  getAllCourses,
};
