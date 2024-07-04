import express from "express";
import { addProject, deleteProject, getIncompleted, getProject, getProjectLinks, updateProject } from "../controllers/project.controller";

const router = express.Router();
router.get("/get-projects", getProjectLinks);
router.post("/add-project",addProject);
router.get("/get-project/:project_id", getProject);
router.delete("/delete-project/:project_id", deleteProject);
router.put("/update-project/:project_id", updateProject);
router.get('/get-incomplete',getIncompleted)
export default router;