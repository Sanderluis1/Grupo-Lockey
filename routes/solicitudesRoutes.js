const express = require('express')
const router = express.Router()
const solicitudController = require('../controllers/solicitudController')
const { requireAuth } = require('../middleware/authMiddleware');

router.get("/", requireAuth, solicitudController.getSolicitudes)
router.post("/constancia", requireAuth, solicitudController.createConstancia)
router.post("/prestamo", requireAuth, solicitudController.createPrestamo)
router.post("/adelanto", requireAuth, solicitudController.createAdelanto)
router.post("/epp", requireAuth, solicitudController.createEpp)
router.post("/capacitacion", requireAuth, solicitudController.createCapacitacion)
router.post("/requisicion", requireAuth, solicitudController.createRequisicion)

module.exports = router
