// Importamos todos los servicios que creaste en el paso anterior
import * as InstitutosServices from '../services/Institutos.service.js';
// Importamos la librería de errores
import boom from '@hapi/boom';

// EMI: API GET (Todas las Instituciones)
export const getInstitutosList = async (req, res, next) => {
    try {
        const institutosList = await InstitutosServices.getInstitutosList();
        
        // Si no hay datos, lanzamos un error 404
        if (!institutosList) {
            throw boom.notFound('No se encontró ningún instituto registrado.');
        } else if (institutosList) {
            // Si todo sale bien, respondemos con estatus 200 (Éxito) y los datos en JSON
            res.status(200).json({
                success: true,
                data: [
                    {
                        dataRes: institutosList
                    }
                ]
            });
        }
    } catch (error) {
        next(error);
    }
};

// EMI: API GET (Solo un Instituto por ID)
export const getInstitutoItem = async (req, res, next) => {
    try {
        // Obtenemos el parámetro 'id' desde la URL usando desestructuración
        const { id } = req.params;
        
        // Obtenemos el tipo de llave (keyType) desde el query. Si no lo envían, por defecto será 'OK'
        const keyType = req.query.keyType || 'OK';
        
        const institutoItem = await InstitutosServices.getInstitutoItem(id, keyType);
        
        if (!institutoItem) {
            throw boom.notFound('No se encontró el instituto requerido.');
        } else if (institutoItem) {
            res.status(200).json({
                success: true,
                data: [
                    {
                        dataRes: institutoItem
                    }
                ]
            });
        }
    } catch (error) {
        next(error);
    }
};

// EMI: API POST
// ----------------------------------------------------------------------
// EMI: API POST (ADD) Instituto o Institutos (JSON en BODY)
export const postInstitutoItem = async (req, res, next) => {
    try {
        // EMI: Mandamos el body directamente al servicio (puede ser un objeto o un arreglo)
        const institutosAdded = await InstitutosServices.postInstitutoItem(req.body);
        
        // EMI: Validamos usando las banderas de nuestro manejador de respuestas
        if (institutosAdded.fail) {
            // El estatus 409 (Conflict) es ideal cuando intentan insertar IDs duplicados
            res.status(409).json(institutosAdded);
        } else if (institutosAdded.success) {
            // El estatus 201 (Created) se envía si todo salió perfecto
            res.status(201).json(institutosAdded);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// EMI: API PUT
// ----------------------------------------------------------------------
// EMI: API PUT (MODIFY) Instituto.
export const putInstitutoItem = async (req, res, next) => {
    try {
        // 1. Obtenemos el ID del instituto desde la URL (ej. /api/v1/institutos/123)
        const { id } = req.params;
        console.log('EMI: controller id -> ', id);
        
        // 2. Obtenemos la nueva información desde el cuerpo de la petición (JSON)
        const paInstitutoItem = req.body;
        console.log('EMI: controller body -> ', paInstitutoItem);
        
        // 3. Mandamos llamar al servicio que creaste en el paso 8.1
        const updatedInstitutoItem = await InstitutosServices.putInstitutoItem(id, paInstitutoItem);
        
        // 4. Validamos la respuesta
        if (!updatedInstitutoItem) {
            throw boom.badRequest('No se pudo actualizar el Instituto.');
        } else if (updatedInstitutoItem) {
            // Respondemos con estatus 200 (OK) y mostramos cómo quedó el documento actualizado
            res.status(200).json(updatedInstitutoItem);
        }
    } catch (error) {
        next(error);
    }
};

// EMI: API DELETE
// ----------------------------------------------------------------------
// EMI: API DELETE (REMOVE) Instituto.
export const deleteInstitutoItem = async (req, res, next) => {
    try {
        // 1. Obtenemos el ID del instituto a borrar desde la URL (ej. /api/v1/institutos/4)
        const { id } = req.params;
        console.log('EMI: controller delete id -> ', id);
        
        // 2. Mandamos llamar al servicio de borrado que creaste en el paso 9.1
        const deletedInstitutoItem = await InstitutosServices.deleteInstitutoItem(id);
        
        // 3. Validamos la respuesta
        if (!deletedInstitutoItem) {
            // Si nos devuelve vacío, significa que el ID no existía en la base de datos
            throw boom.notFound('No se encontró el Instituto que deseas eliminar.');
        } else if (deletedInstitutoItem) {
            // Si se borró con éxito, regresamos un estatus 200 y los datos del documento eliminado
            res.status(200).json(deletedInstitutoItem);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};