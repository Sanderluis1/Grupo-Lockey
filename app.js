// app.js (SOLO configuración y exportación)
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");

// Importar rutas y DB
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const solicitudesRoutes = require("./routes/solicitudesRoutes")
const gestionSolicitudes = require("./routes/gestionSolicitudesRoutes")
const misSolicitudesRoutes = require("./routes/misSolicitudesRoutes")
require("./config/db"); // Inicializa la conexión a DB

const app = express();

// ---------------------------------------------
// Middlewares y Configuración (IDÉNTICO AL ANTERIOR)
// ---------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "src")));
app.use(methodOverride("_method"));

app.use(
    session({
        secret: "secreto",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

app.use((req, res, next) => {
    console.log("Método HTTP recibido:", req.method, "Ruta:", req.originalUrl);
    next();
});

app.use(
    methodOverride((req, res) => {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    }),
);

// ** MONTAJE DE RUTAS **
app.use("/", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/solicitudes", solicitudesRoutes)
app.use("/missolicitudes", misSolicitudesRoutes)
app.use("/gestionsolicitudes", gestionSolicitudes)

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal!");
});

// ¡IMPORTANTE! Exportar la app para que server.js la use.
module.exports = app;
