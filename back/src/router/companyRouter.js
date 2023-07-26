import express from "express";
const router = express.Router();
import { getCompanies, createCompany, updateCompany } from "../routes/companyRoutes.js";

router.get("/", getCompanies);
router.post("/", createCompany);
router.put("/:companyId", updateCompany);

export default router;