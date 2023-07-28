import express from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser, addCompanyToUser, getCompaniesFromUser } from "../routes/userRoutes.js";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.put("/:userId/companies", addCompanyToUser);
router.get("/:userId/companies", getCompaniesFromUser);


export default router;
