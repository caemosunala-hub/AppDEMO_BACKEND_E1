import { OK, FAIL } from '../../../middlewares/resp.handler.js';
import Etiquetas from '../models/etiquetas.js';
import boom from '@hapi/boom';

// Indigo: GET ETIQUETAS LIST (Este es el que usa GetAllLabels en React)
export const getEtiquetasList = async () => {
    let etiquetasList;
    try {
        etiquetasList = await Etiquetas.find();
        return etiquetasList;
    } catch (error) {
        throw boom.internal(error);
    }
};

export const getEtiquetaItem = async (id, keyType) => {
    let etiquetaItem;
    try {
        if (keyType === 'OK') {
            etiquetaItem = await Etiquetas.findOne({ IdEtiquetaOK: id });
        } else if (keyType === 'BK') {
            etiquetaItem = await Etiquetas.findOne({ IdEtiquetaBK: id });
        }
        return etiquetaItem;
    } catch (error) {
        throw boom.internal(error);
    }
};

export const postEtiquetaItem = async (paEtiquetaItem) => {
    try {
        const etiquetasAdded = await Etiquetas.insertMany(paEtiquetaItem, { ordered: true });
        return OK('Etiqueta(s) agregada(s) correctamente.', etiquetasAdded);
    } catch (error) {
        if (error.code === 11000) {
            return FAIL('La etiqueta enviada ya está registrada.', error);
        } else {
            return FAIL('No se pudo agregar la etiqueta al catálogo.', error);
        }
    }
};

export const putEtiquetaItem = async (id, paEtiquetaItem) => {
    try {
        return await Etiquetas.findOneAndUpdate(
            { IdEtiquetaOK: id }, 
            paEtiquetaItem, 
            { new: true }
        );
    } catch (error) {
        throw boom.badImplementation(error);
    }
};

export const deleteEtiquetaItem = async (id) => {
    try {
        const deletedEtiqueta = await Etiquetas.findOneAndDelete({ IdEtiquetaOK: id });
        return deletedEtiqueta;
    } catch (error) {
        throw boom.badImplementation(error);
    }
};