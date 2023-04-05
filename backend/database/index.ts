import db from './db';

type UserFeedback = {
  id: number,
  user_id: number,
  test_id: number,
  feedback: string,
  result: string
}

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

const findUsersByMobId = async (mobId:string) => {
  const mobUsers = await db.findUsersByMobId(mobId);
  return mobUsers;
};

const findCoursesById = async (courseId:string) => {
  const courseUsers = await db.findCoursesById(courseId);
  return courseUsers;
};

const findTestById = async (id:string) => {
  const test = await db.findTestById(id);
  return test;
};

const findTestByCourseId = async (courseId:string) => {
  const test = await db.findTestByCourseId(courseId);
  return test;
};

const findPreviousTestsById = async (userId:string) => {
  const tests = await db.findPreviousTestsById(userId);
  return tests;
};

const getAllUserDetails = async () => {
  const users = await db.getAllUserDetails();
  return users;
};

const getUserDetailsByEmail = async (email: string) => {
  const users = await db.getUserDetailsByEmail(email);
  return users;
};

const postNewFeedback = async (data: UserFeedback) => {
  const result = await db.postNewFeedback(data);
  return result;
};

const updateFeedback = async (data: UserFeedback) => {
  const result = await db.updateFeedback(data);
  return result;
};

const index = () => console.log('test');

export default {
  index,
  getAllUsers,
  getAllWeekendTest,
  getAllStudents,
  getAllCourses,
  findUsersByMobId,
  findCoursesById,
  findTestById,
  findTestByCourseId,
  findPreviousTestsById,
  getAllUserDetails,
  getUserDetailsByEmail,
  postNewFeedback,
  updateFeedback,
};
