import { Router } from 'express';
import facesRoutes from './faces.routes.ts';

const apiRouter = Router();

apiRouter.use('/v1', facesRoutes);

export default apiRouter;