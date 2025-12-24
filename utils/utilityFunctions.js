import fs from "fs/promises";
import path from "path";

const __dirname = process.cwd();





async function fileExists(path) {
  try {
    await fs.access(path, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export async function readStudents() {
  if (!(await fileExists(__dirname + "/data/students.json"))) {
    return [];
  }
  try {
    const data = await fs.readFile(__dirname + "/data/students.json", "utf8");

    return JSON.parse(data);
  } catch (error) {
    // If file is corrupted or empty, return empty array
    return [];
  }
}

export async function writeStudents(students) {
  await fs.writeFile(__dirname + "/data/students.json", JSON.stringify(students, null, 2), "utf8");
}

export async function readCourses() {
  if (!(await fileExists(__dirname + "/data/courses.json"))) {
    return [];
  }
  try {
    const data = await fs.readFile(__dirname + "/data/courses.json", "utf8");

    return JSON.parse(data);
  } catch (error) {
    // If file is corrupted or empty, return empty array
    return [];
  }
}

export async function writeCourses(courses) {
  await fs.writeFile(
    __dirname + "/data/courses.json",
    JSON.stringify(courses, null, 2),
    "utf8"
  );
}
