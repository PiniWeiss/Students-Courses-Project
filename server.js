import express from "express";
import students from "./routes/students.js";
import courses from "./routes/courses.js";

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});

app.use(express.json())

app.use("/students", students)
app.use("/courses", courses)

app.listen(8000, () => console.log("listening on port 8000"))