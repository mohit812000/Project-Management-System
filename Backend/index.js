import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/student.router";
import categoryRouter from "./routers/category.router";
import adminRouter from "./routers/admin.router";
import cors from 'cors';
import projectRouter from "./routers/project.router";
import subCourseRouter from "./routers/subCourse.router";
import emailRouter from "./routers/email.router"

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 8005;

mongoose.connect("mongodb+srv://mohitsharma98023:mohitsharma45@projectmanagementsystem.jnlgxbi.mongodb.net/projectManagement")
// mongoose.connect("mongodb://localhost:27017/projectManagement")
.then(()=> console.log("Connected!"))
.catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log(`Server in running on http://localhost:${PORT}`)
})

app.use(studentRouter)
app.use(categoryRouter)
app.use(adminRouter)
app.use(projectRouter)
app.use(subCourseRouter)
app.use(emailRouter)