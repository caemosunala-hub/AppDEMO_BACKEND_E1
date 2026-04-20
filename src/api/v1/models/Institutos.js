import mongoose from "mongoose";

// Indigo: Definición del esquema para Institutos
const institutosSchema = new mongoose.Schema({
    IdInstitutoOK: { type: String, required: true },
    IdInstitutoBK: { type: String, required: true },
    DesInstituto: { type: String, required: true },
    Alias: { type: String, required: false },
    Matriz: { type: String, required: false },
    Giro: { type: String, required: false },
    IdInstitutoSupOK: { type: String, required: false }
});

// Indigo: Exportamos el modelo
export default mongoose.model(
    'cat_institutos',
    institutosSchema,
    'cat_institutos'
);