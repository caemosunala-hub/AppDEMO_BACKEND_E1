// PUSH OBJECT NEW INFO ADICIONAL
export const pushObjInfoAdCO = async (id, objInfoAd) => {
    try {
        // Buscamos el documento y lo actualizamos en un solo paso
        const contractUpdatedCO = await Contratos.findOneAndUpdate(
            { IdContratoBK: id }, // 1. Filtro: Buscamos el contrato por su ID
            { $push: { contratos_info_adicional: objInfoAd } }, // 2. Acción: Empujamos la nueva info al arreglo
            { new: true } // 3. Opción: Pedimos que nos devuelva el documento ya actualizado
        );
        return { success: true, contractUpdatedCO };
    } catch (error) {
        return { success: false, error };
    }
};

// Indigo: UPDATE ARRAY[OBJECT] INFO ADICIONAL NO EXPORT USE INTERNAL
// Esta función modifica un objeto que YA EXISTE en el arreglo
const setObjInfoAdCO = async (id, objInfoAd) => {
    try {
        const contractUpdatedCO = await Contratos.findOneAndUpdate(
            { 
                IdContratoBK: id,
                // $elemMatch busca el objeto exacto dentro del arreglo usando su etiqueta
                contratos_info_adicional: { $elemMatch: { IdEtiqueta: objInfoAd.IdEtiqueta } }
            },
            // El símbolo "$" representa la posición exacta del objeto que encontró arriba
            { $set: { "contratos_info_adicional.$": objInfoAd } },
            { new: true }
        );
        return { success: true, contractUpdatedCO };
    } catch (error) {
        return { success: false, error };
    }
};

// indigo: PUSH OR SET ONE BY ONE ARRAY[OBJECT] INFO ADICIONAL
// Esta es la función inteligente que se exporta y usa el Controlador
export const getPushSetArrInfoAdCO = async (id, arrInfoAd) => {
    try {
        let saveInContractInfoAd; // Variable para guardar el resultado de cada iteración
        
        for (let objInfoAd of arrInfoAd) {
            // Primero, verifica si el objeto ya existe en el arreglo
            const modelResult = await Contratos.findOne({ 
                IdContratoBK: id,
                contratos_info_adicional: { $elemMatch: { IdEtiqueta: objInfoAd.IdEtiqueta } }
            });

            if (!modelResult) {
                // Si NO existe, usa la función del paso 7.1.2 para AGREGARLO ($push)
                saveInContractInfoAd = await pushObjInfoAdCO(id, objInfoAd);
            } else {
                // Si SÍ existe, usa la función de arriba para MODIFICARLO ($set)
                saveInContractInfoAd = await setObjInfoAdCO(id, objInfoAd);
            }
        }
        return { success: true, saveInContractInfoAd };
    } catch (error) {
        return { success: false, error };
    }
};