import express from "express";

import {
  getCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses.js";

const router = express.Router();

router.route("/").get(getCourses).post(createCourse)
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse)

export default router;