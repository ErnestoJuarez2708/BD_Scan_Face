import { Router } from "express";
import { recognizeFace } from "../controllers/accessLogs.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post(
  "/recognize",
  upload.single("file"),
  recognizeFace
);

export default router;
