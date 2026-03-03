import { Router } from 'express';
import * as facesController from '../controllers/faces.controller.ts';

const router = Router();

router.post(
  '/users/:userId/faces',
  facesController.registerFace
);

export default router;