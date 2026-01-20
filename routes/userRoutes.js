const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { requireRole } = require('../middleware/authMiddleware')
const { validateCreateUser } = require('../middleware/authMiddleware')
const { validateEditUser } = require('../middleware/authMiddleware')

// Rutas de Gestión de Usuarios (CRUD)
// Solo permitido para Rol 1 o 2 (Administrador/Gestor)
router.get("/", requireRole([1, 2]), userController.getUsuarios)
router.post("/", requireRole([1, 2]), validateCreateUser, userController.createUsuario)
router.put("/:id", requireRole([1, 2]), validateEditUser, userController.updateUsuario)
router.delete("/:id", requireRole([1, 2]), userController.deleteUsuario)

module.exports = router
