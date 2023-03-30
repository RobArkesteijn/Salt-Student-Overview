import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

const pool = new Pool({
  connectionString: `postgres://${user}:${password}@trumpet.db.elephantsql.com/${user}`,
});

type Result = {
  id: number,
  email: string,
  first_name: string,
  last_name:string,
  Role:string,
  mob_id:number,
  course_id:number,
};

type WeekendTest = {
  describtion:string,
  id: number,
  name: string,
  repo_url: string,
  courser_id:number,
};

type Student = {
  id: number,
  finished_tests: string[],
  notes: string[],
};

type Course = {
  id: number,
  name: string,
};

type MobUsers = {
  id: number,
  email: string,
  first_name: string,
  last_name:string,
  Role:string,
  mob_name: string,
  mob_id: number
};

type CoursesUsers = {
  id: number,
  email: string,
  first_name: string,
  last_name:string,
  Role:string,
  mob_id:number,
  course_id:number,
  name:string
};

const getAllUsers = async () => {
  const client = await pool.connect();
  const result:{ rowCount: number, rows: Result[] } = await client.query('SELECT * FROM "SaltDB"."Users"');
  if (result.rowCount === 0) {
    return [];
  }
  client.release();
  const { rows } = result;
  return rows.map(row => {
    const userRow : Result = {
      id: row.id as number,
      email: row.email as string,
      first_name: row.first_name as string,
      last_name: row.last_name as string,
      Role: row.Role as string,
      mob_id:row.mob_id as number,
      course_id:row.course_id as number,
    };
    return userRow;
  });
};

const getAllWeekendTest = async () => {
  const client = await pool.connect();
  const result:{ rowCount: number, rows: WeekendTest[] } = await client.query('SELECT * FROM "SaltDB"."WeekendTests"');
  if (result.rowCount === 0) {
    return [];
  }
  client.release();
  const { rows } = result;
  return rows.map(row => {
    const weekendTestRow : WeekendTest = {
      describtion: row.describtion as string,
      id: row.id as number,
      name: row.name as string,
      repo_url: row.repo_url as string,
      courser_id: row.courser_id as number,
    };
    return weekendTestRow;
  });
};

const getAllStudents = async () => {
  const client = await pool.connect();
  const result:{ rowCount: number, rows: Student[] } = await client.query('SELECT * FROM "SaltDB"."Students"');
  if (result.rowCount === 0) {
    return [];
  }
  client.release();
  const { rows } = result;
  return rows.map(row => {
    const studentsRow : Student = {
      id: row.id as number,
      finished_tests: row.finished_tests as string[],
      notes: row.notes as string[],
    };
    return studentsRow;
  });
};

const getAllCourses = async () => {
  const client = await pool.connect();
  const result:{ rowCount: number, rows: Course[] } = await client.query('SELECT * FROM "SaltDB"."Courses"');
  if (result.rowCount === 0) {
    return [];
  }
  client.release();
  const { rows } = result;
  return rows.map(row => {
    const coursesRow : Course = {
      id: row.id as number,
      name: row.name as string,
    };
    return coursesRow;
  });
};

const findCoursesById = async (courseId:string) => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM "SaltDB"."Users" FULL OUTER JOIN "SaltDB"."Courses" ON "SaltDB"."Courses"."id" = "SaltDB"."Users"."course_id" WHERE course_id=$1', [courseId]);
  if (result.rowCount === 0) {
    return undefined;
  }
  client.release();
  const { rows } = result;
  return rows.map(row => {
    const courseUserRows : CoursesUsers = {
      id: row.id as number,
      email: row.email as string,
      first_name: row.first_name as string,
      last_name: row.last_name as string,
      Role: row.Role as string,
      mob_id: row.mob_id as number,
      course_id: row.course_id as number,
      name: row.name as string  
    };
    return courseUserRows;
  });
};

const findUsersByMobId = async (mobId:string) => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM "SaltDB"."Users" FULL OUTER JOIN "SaltDB"."Mob" ON "SaltDB"."Mob"."id" = "SaltDB"."Users"."mob_id" WHERE mob_id=$1', [mobId]);
  if (result.rowCount === 0) {
    return undefined;
  }
  client.release();
  const { rows } = result;
  return rows.map(row => {
    const mobRows : MobUsers = {
      id: row.id as number,
      email: row.email as string,
      first_name: row.first_name as string,
      last_name: row.last_name as string,
      Role: row.Role as string,
      mob_id: row.mob_id as number,
      mob_name: row.mob_name as string,
    };
    return mobRows;
  });
};
// pool.query('SELECT * FROM "SaltDB"."Users" FULL OUTER
// JOIN "SaltDB"."Mob" ON "SaltDB"."Mob"."id" = "SaltDB"."Users"."mob_id"', (err, res) => {
//   if (err) {
//     console.log('mob', err);
//   } else {
//     console.log('mobs', res);
//   }
// });

export default {
  getAllUsers,
  getAllWeekendTest,
  getAllStudents,
  getAllCourses,
  findUsersByMobId,
  findCoursesById,
};
