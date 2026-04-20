import express from "express";
import morgan from "morgan";
import cors from "cors";
import routeAPI from './api/v1/routes/index.js';

// Configuración de variables de entorno
import config from "./config/config.js";

// Declaramos la constante app igualándola a express
const app = express();

// Establece la conexión a la BD
import './config/database.config.js';

// Settings
app.set('port', config.PORT);

// Middlewares generales
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de prueba
const api = config.API_URL;

app.get(`${api}`, (req, res) => {
    res.send(
        `<h1>RESTful running in root</h1> <p> eSecurity: <b>${api}/api-docs</b> for more information.</p>`
    );
});

app.get('/IngIndigo', (req, res) => {
    res.send(
        `<h1>RESTful running in IngIndigo</h1> <p> eSecurity: <b>${api}/api-docs</b> for more information.</p>`
    );
});

// Ruta principal real
app.get('/', (req, res) => {
    // Te redirige automáticamente a la ruta de tu API
    res.redirect(config.API_URL); 
});

// Routes
routeAPI(app);

// Exportamos la app
export default app;