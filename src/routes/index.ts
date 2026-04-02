import { Router } from 'express';
import facesRoutes from './faces.routes';
import accessLogsRoutes from './accessLogs.routes';

const apiRouter = Router();

apiRouter.use('/v1', facesRoutes);
apiRouter.use('/v1/access-logs', accessLogsRoutes);

export default apiRouter;
