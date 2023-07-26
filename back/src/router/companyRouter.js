import express from "express";
const router = express.Router();
import { getCompanies, createCompany } from "../routes/companyRoutes.js";

router.get("/", getCompanies);
router.post("/", createCompany);

export default router;