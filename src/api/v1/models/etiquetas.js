import mongoose from "mongoose";

// Indigo: Definición del esquema para Etiquetas
const etiquetasSchema = new mongoose.Schema({
    IdEtiquetaOK: { type: String, required: true },
    IdEtiquetaBK: { type: String, required: true },
    DesEtiqueta: { type: String, required: true },
    // Definimos detail_row como un objeto libre
    detail_row: { type: Object, required: false },
    // Definimos valores como un arreglo libre que contendrá los subdocumentos
    valores: { type: Array, required: false }
});

// Indigo: Exportamos el modelo
export default mongoose.model(
    'cat_etiquetas',
    etiquetasSchema,
    'cat_etiquetas'
);