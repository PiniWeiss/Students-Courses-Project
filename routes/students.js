import express from "express";

import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/students.js";

const router = express.Router();

router.route("/").get(getStudents).post(createStudent)
router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent)

export default router;