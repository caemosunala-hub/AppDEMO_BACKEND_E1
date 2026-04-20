import { Router } from 'express';
import * as EtiquetasController from '../controllers/etiquetas.controller.js';

const router = Router();

// Indigo: Rutas de Etiquetas
router.get('/', EtiquetasController.getEtiquetasList);
router.get('/:id', EtiquetasController.getEtiquetaItem);
router.post('/', EtiquetasController.postEtiquetaItem);
router.put('/:id', EtiquetasController.putEtiquetaItem);
router.delete('/:id', EtiquetasController.deleteEtiquetaItem);

export default router;