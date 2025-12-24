import {
  readCourses,
  writeCourses,
} from "../utils/utilityFunctions.js";

export const getNextId = (courses) => {
  if (!courses || courses.length === 0) {
    return 1;
  }
  let maxValue = 0;
  courses.forEach((course) => {
    if (course.id > maxValue) {
      maxValue = course.id;
    }
  });
  return maxValue + 1;
};

export const getCourses = async (req, res) => {
  try {
    const Courses = await readCourses();

    if (!Courses) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: Courses });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const Courses = await readCourses();

    const course = Courses.find((s) => s.id === intId);

    if (!course) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: course });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const courses = await readCourses();

    if (req.headers["content-type"] !== "application/json")
      throw new Error("Content type error.");

    const newCourse = {
      id: getNextId(courses),
      name: req.body.name,
      instructor: req.body.instructor,
      credits: req.body.credits 
    };
    courses.push(newCourse);
    await writeCourses(courses);
    res.status(201).json({ msg: "success", data: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const Courses = await readCourses();
    const course = Courses.find((c) => c.id === intId);

    if (!course) {
      res.status(404).json({ success: false, data: {} });
    } else {
      course.name = body.name || course.name;
      course.instructor = body.instructor || course.instructor;
        course.credits = body.credits || course.credits;
      await writeCourses(Courses);
      res.status(201).json({ success: true, data: course });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    const courses = await readCourses();
    const indexCourses = courses.findIndex((c) => c.id === intId);
    if (indexCourses === -1) {
      res.status(404).json({ success: false, data: {} });
    } else {
      courses.splice(indexCourses, 1);
      await writeCourses(courses)

      res.send({success: true, data: {}})
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};
