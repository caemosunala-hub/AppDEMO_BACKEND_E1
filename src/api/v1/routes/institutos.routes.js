import { Router } from 'express';
// EMI: Se importamos el controlador de institutos
import * as InstitutosController from '../controllers/institutos.controller.js';

const router = Router();

// EMI: Rutas para obtener datos (GET)
router.get('/', InstitutosController.getInstitutosList);
router.get('/:id', InstitutosController.getInstitutoItem);

// EMI: Ruta para agregar nuevos datos (POST) - Individual
router.post('/', InstitutosController.postInstitutoItem);

// EMI: Ruta para agregar MUCHOS institutos para WEB/PWA
router.post('/many-pwa', InstitutosController.postInstitutoItem);

// EMI: Ruta para modificar un instituto existente (PUT)
router.put('/:id', InstitutosController.putInstitutoItem);

// EMI: Ruta para eliminar un instituto existente (DELETE)
router.delete('/:id', InstitutosController.deleteInstitutoItem);

export default router;