const express = require('express')
const router = express.Router()
const misSolicitudesController = require('../controllers/misSolicitudesController')
const { requireAuth } = require('../middleware/authMiddleware')
const { requireUser } = require('../middleware/authMiddleware')
const { generatePdfConstancia } = require('../controllers/reportController')

router.get("/", requireAuth, misSolicitudesController.getMisSolicitudes)
router.get("/reporte/:id", requireAuth, requireUser, generatePdfConstancia)
router.get("/detalles/:id/:tipo", requireAuth, misSolicitudesController.getDetailsbyIdSolicitud)

module.exports = router
