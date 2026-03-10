import { Router } from 'express';
import facesRoutes from './faces.routes';

const apiRouter = Router();

apiRouter.use('/v1', facesRoutes);

export default apiRouter;