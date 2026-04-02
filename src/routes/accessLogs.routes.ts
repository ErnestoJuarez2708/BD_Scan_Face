import { Router } from "express";
import {registerAccess } from "../controllers/accessLogs.controller";

const router = Router();

router.post(
  "/register",
  registerAccess
);

export default router;
