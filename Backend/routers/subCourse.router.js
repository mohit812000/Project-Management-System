import express from "express";
import { addSubCourse, deleteSubCourse, getSubCourse, get_AllsubCourse, updateSubCourse } from "../controllers/subCourse.Controller";

const router = express.Router();
router.get("/get-allSubCourse", get_AllsubCourse);
router.post("/add-subCourse", addSubCourse);
router.get("/get-subCourse/:subCourse_id", getSubCourse);
router.delete("/delete-subCourse/:subCourse_id", deleteSubCourse);
router.put("/update-subCourse/:subCourse_id", updateSubCourse);
export default router;