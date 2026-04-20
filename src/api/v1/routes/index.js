import { Router } from 'express';
import config from '../../../config/config.js';

// Importamos tus rutas de institutos
import institutosRoutes from './institutos.routes.js';
// Importamos las rutas de etiquetas
import etiquetasRoutes from './etiquetas.routes.js';

const routerAPI = (app) => {
    const router = Router();
    const api = config.API_URL; // Esto vale '/api/v1'

    app.use(api, router);

    // Todas las peticiones que vayan a /api/v1/institutos serán manejadas por institutosRoutes
    router.use('/institutos', institutosRoutes);
    // Todas las peticiones que vayan a /api/v1/etiquetas serán manejadas por etiquetasRoutes
    router.use('/etiquetas', etiquetasRoutes);

    return router;
};

export default routerAPI;