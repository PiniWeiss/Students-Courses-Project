import express from "express";

import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  courseEnrollment
} from "../controllers/students.js";

const router = express.Router();

router.route("/").get(getStudents).post(createStudent)
router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent)
router.route("/:studentId/enroll/:courseId").post(courseEnrollment)


export default router;