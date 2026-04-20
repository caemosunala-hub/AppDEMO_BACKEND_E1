import { Router } from 'express';
// Indigo: Se importamos el controlador de institutos
import * as InstitutosController from '../controllers/institutos.controller.js';

const router = Router();

// Indigo: Rutas para obtener datos (GET)
router.get('/', InstitutosController.getInstitutosList);
router.get('/:id', InstitutosController.getInstitutoItem);

// Indigo: Ruta para agregar nuevos datos (POST) - Individual
router.post('/', InstitutosController.postInstitutoItem);

// Indigo: Ruta para agregar MUCHOS institutos para WEB/PWA
router.post('/many-pwa', InstitutosController.postInstitutoItem);

// Indigo: Ruta para modificar un instituto existente (PUT)
router.put('/:id', InstitutosController.putInstitutoItem);

// Indigo: Ruta para eliminar un instituto existente (DELETE)
router.delete('/:id', InstitutosController.deleteInstitutoItem);

export default router;