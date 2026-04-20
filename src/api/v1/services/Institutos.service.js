import { OK, FAIL } from '../../../middlewares/resp.handler.js';

// Importamos el modelo de datos que creaste en el paso anterior
import Institutos from '../models/Institutos.js';
// Importamos boom para manejar los errores de forma profesional
import boom from '@hapi/boom';

// Indigo: GET INSTITUTES LIST (Obtener todos los institutos)
export const getInstitutosList = async () => {
    let institutosList;
    try {
        // Le decimos a Mongoose que busque todos los documentos en la colección
        institutosList = await Institutos.find();
        return institutosList;
    } catch (error) {
        throw boom.internal(error);
    }
};

// Indigo: GET INSTITUTE BY ID (Obtener un solo instituto por su ID)
export const getInstitutoItem = async (id, keyType) => {
    let institutoItem;
    try {
        // Validamos si la búsqueda es por Operational Key (OK) o Business Key (BK)
        if (keyType === 'OK') {
            institutoItem = await Institutos.findOne({
                IdInstitutoOK: id,
            });
        } else if (keyType === 'BK') {
            institutoItem = await Institutos.findOne({
                IdInstitutoBK: id,
            });
        }
        return institutoItem;
    } catch (error) {
        throw boom.internal(error);
    }
};

// Indigo: POST (ADD) Instituto/Institutos
export const postInstitutoItem = async (paInstitutoItem) => {
    try {
        // Usamos insertMany para poder agregar uno o varios objetos a la vez
        const institutosAdded = await Institutos.insertMany(paInstitutoItem, { ordered: true });
        return OK('Instituto(s) agregado(s) correctamente al catálogo.', institutosAdded);
    } catch (error) {
        if (error.code === 11000) {
            return FAIL(
                'Alguno(s) de los institutos enviados ya están registrados en el catálogo de la BD. Verifica la información e intenta de nuevo.',
                error
            );
        } else {
            return FAIL(
                'No se pudo agregar el instituto al catálogo. Error en el servidor.',
                error
            );
        }
    }
};

// Indigo: SERVICES PUT
// ----------------------------------------------------------------------
// Indigo: PUT (MODIFY) INSTITUTOS
export const putInstitutoItem = async (id, paInstitutoItem) => {
    try {
        // console.log("Indigo: PUT API INSTITUTO", id);
        
        // Buscamos el instituto por su ID y le pasamos los nuevos datos para que se actualice
        return await Institutos.findOneAndUpdate(
            { IdInstitutoOK: id }, 
            paInstitutoItem, 
            { new: true }
        );
    } catch (error) {
        // Si algo falla a nivel de servidor o base de datos, lanzamos un error 500
        throw boom.badImplementation(error);
    }
};

// Indigo: SERVICES DELETE
// ----------------------------------------------------------------------
// Indigo: DELETE (REMOVE) INSTITUTOS
export const deleteInstitutoItem = async (id) => {
    try {
        // Le decimos a la base de datos que busque el documento por su ID y lo elimine por completo
        const deletedInstituto = await Institutos.findOneAndDelete({ IdInstitutoOK: id });
        
        // Retornamos el documento borrado (útil por si el Front-End quiere mostrar qué se borró)
        return deletedInstituto;
    } catch (error) {
        throw boom.badImplementation(error);
    }
};