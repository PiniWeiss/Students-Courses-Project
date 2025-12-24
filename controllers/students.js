import { ChildProcess } from "child_process";
import { readStudents, writeStudents } from "../utils/utilityFunctions.js";

export const getNextId = (students) => {
  if (!students || students.length === 0) {
    return 1;
  }
  let maxValue = 0;
  students.forEach((student) => {
    if (student.id > maxValue) {
      maxValue = student.id;
    }
  });
  return maxValue + 1;
};

export const getStudents = async (req, res) => {
  try {
    const students = await readStudents();

    if (!students) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: students });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const students = await readStudents();

    const student = students.find((s) => s.id === intId);

    if (!student) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: student });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const students = await readStudents();

    if (req.headers["content-type"] !== "application/json")
      throw new Error("Content type error.");

    const newStudent = {
      id: getNextId(students),
      name: req.body.name,
      email: req.body.email,
      enrolledCourses: req.body.enrolledCourses || [],
    };
    students.push(newStudent);
    await writeStudents(students);
    res.status(201).json({ msg: "success", data: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const students = await readStudents();
    const student = students.find((s) => s.id === intId);

    if (!student) {
      res.status(404).json({ success: false, data: {} });
    } else {
      student.name = body.name || student.name;
      student.email = body.email || student.email;
      await writeStudents(students);
      res.status(201).json({ success: true, data: student });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    const students = await readStudents();
    const indexStudent = students.findIndex((s) => s.id === intId);
    if (indexStudent === -1) {
      res.status(404).json({ success: false, data: {} });
    } else {
      students.splice(indexStudent, 1);
      await writeStudents(students);
      res.send({ success: true, data: {} });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const courseEnrollment = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { courseId } = req.params;
    const studentIntId = parseInt(studentId);
    const courseIntId = parseInt(courseId);
    
    if (isNaN(studentIntId))
      throw new Error("Invalid id, please use an integer.");
    if (isNaN(courseIntId))
      throw new Error("Invalid id, please use an integer.");
    const students = await readStudents();

    const student = students.find((s) => s.id === studentIntId);
    
    const course = student.enrolledCourses.find(
      (course) => course === courseIntId
    );
    if (course)
      throw new Error("This course is allready in his enrolledCourses.");
    if (!student) {
      res.status(404).json({ success: false, data: {} });
    } else {
      student.enrolledCourses.push(courseIntId);
      await writeStudents(students);
      res.status(201).json({ success: true, data: student });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};
