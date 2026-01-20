const express = require('express')
const router = express.Router()
const gestionSolicitudesController = require('../controllers/gestionSolicitudesController')
const { requireRole } = require('../middleware/authMiddleware')
const { generatePdfConstancia } = require('../controllers/reportController')

router.get("/", requireRole([1, 2]), gestionSolicitudesController.getAllSolicitudes)
router.get("/reporte/:id", requireRole([1, 2]), generatePdfConstancia)
router.get("/detalles/:id/:tipo/:usuario", requireRole([1, 2]), gestionSolicitudesController.getDetailsbyIdSolicitud)
router.put("/:res/:idSolicitud", requireRole([1, 2]), gestionSolicitudesController.resSolicitud)

module.exports = router
