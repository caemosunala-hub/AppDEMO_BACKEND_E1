import * as EtiquetasServices from '../services/etiquetas.service.js';
import boom from '@hapi/boom';

// Indigo: API GET (Todas las Etiquetas)
export const getEtiquetasList = async (req, res, next) => {
    try {
        const etiquetasList = await EtiquetasServices.getEtiquetasList();
        
        if (!etiquetasList) {
            throw boom.notFound('No se encontraron etiquetas registradas.');
        } else if (etiquetasList) {
            res.status(200).json({
                success: true,
                data: [{ dataRes: etiquetasList }]
            });
        }
    } catch (error) {
        next(error);
    }
};

// Indigo: API GET (Solo una etiqueta por ID)
export const getEtiquetaItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const keyType = req.query.keyType || 'OK';
        
        const etiquetaItem = await EtiquetasServices.getEtiquetaItem(id, keyType);
        
        if (!etiquetaItem) {
            throw boom.notFound('No se encontró la etiqueta requerida.');
        } else if (etiquetaItem) {
            res.status(200).json({
                success: true,
                data: [{ dataRes: etiquetaItem }]
            });
        }
    } catch (error) {
        next(error);
    }
};

// Indigo: API POST
// ----------------------------------------------------------------------
// Indigo: API POST (ADD) Etiqueta o Etiquetas (JSON en BODY)
export const postEtiquetaItem = async (req, res, next) => {
    try {
        const etiquetasAdded = await EtiquetasServices.postEtiquetaItem(req.body);
        if (etiquetasAdded.fail) {
            res.status(409).json(etiquetasAdded);
        } else if (etiquetasAdded.success) {
            res.status(201).json(etiquetasAdded);
        }
    } catch (error) {
        next(error);
    }
};

// Indigo: API PUT
// ----------------------------------------------------------------------
// Indigo: API PUT (MODIFY) Etiqueta.
export const putEtiquetaItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paEtiquetaItem = req.body;
        const updatedEtiquetaItem = await EtiquetasServices.putEtiquetaItem(id, paEtiquetaItem);
        
        if (!updatedEtiquetaItem) {
            throw boom.badRequest('No se pudo actualizar la etiqueta.');
        } else if (updatedEtiquetaItem) {
            res.status(200).json(updatedEtiquetaItem);
        }
    } catch (error) {
        next(error);
    }
};

// Indigo: API DELETE
// ----------------------------------------------------------------------
// Indigo: API DELETE (REMOVE) Etiqueta.
export const deleteEtiquetaItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedEtiquetaItem = await EtiquetasServices.deleteEtiquetaItem(id);
        
        if (!deletedEtiquetaItem) {
            throw boom.notFound('No se encontró la etiqueta que deseas eliminar.');
        } else if (deletedEtiquetaItem) {
            res.status(200).json(deletedEtiquetaItem);
        }
    } catch (error) {
        next(error);
    }
};