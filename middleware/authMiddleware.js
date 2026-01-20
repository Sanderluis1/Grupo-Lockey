const { body } = require('express-validator');
const GENERIC_MSG = 'CAMPO_REQUERIDO'


// Middleware para verificar autenticación
exports.requireAuth = (req, res, next) => {
  if (req.session.loggedin) return next()
  res.redirect("/")
}

// Middleware para verificar Rol de Administrador/Gestor (Rol 1 o 2)
exports.requireRole = (rolesPermitidos) => (req, res, next) => {
    if (!req.session.loggedin) {
        return res.redirect("/")
    }
    if (rolesPermitidos.includes(req.session.rol)) {
        return next()
    }
    res.redirect("/403")
}

exports.requireUser = async (req, res, next) => {
    const idSolicitud = req.params.id
    const misSolicitudesModel = require("../models/misSolicitudesModel")
    const solicitud = await misSolicitudesModel.getSolicitudByID(idSolicitud)
    const idUsuarioSolicitante = solicitud[0].idUsuarioSolicitante
    if (req.session.idUser === idUsuarioSolicitante) {
        return next()
    }
    res.redirect("/403")
}

exports.validateCreateUser = [
  // Validación de 'password' (con tus requisitos de seguridad)
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)
    .withMessage('La contraseña debe contener al menos un carácter especial'),
  body('salario')
    .notEmpty().withMessage('El salario es requerido')
    .isNumeric().withMessage('El salario debe ser un valor numérico'),
  // Validación del resto de campos (solo revisa que no estén vacíos)
  body('username').trim().notEmpty().withMessage(GENERIC_MSG),
  body('fullname').trim().notEmpty().withMessage(GENERIC_MSG),
  body('cedula').trim().notEmpty().withMessage(GENERIC_MSG),
  body('rol').trim().notEmpty().withMessage(GENERIC_MSG),
  body('empresa').trim().notEmpty().withMessage(GENERIC_MSG),
  body('sede').trim().notEmpty().withMessage(GENERIC_MSG),
  body('cargo').trim().notEmpty().withMessage(GENERIC_MSG),
  body('gerencia').trim().notEmpty().withMessage(GENERIC_MSG),
  body('fechaIngreso').trim().notEmpty().withMessage(GENERIC_MSG),
  body('tallaCamisa').trim().notEmpty().withMessage(GENERIC_MSG),
  body('tallaPantalon').trim().notEmpty().withMessage(GENERIC_MSG),
  body('tallaCalzado').trim().notEmpty().withMessage(GENERIC_MSG),
]

exports.validateEditUser = [
  // Validación de 'password' (con tus requisitos de seguridad)
  body('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)
    .withMessage('La contraseña debe contener al menos un carácter especial'),
  body('salario')
    .notEmpty().withMessage('El salario es requerido')
    .isNumeric().withMessage('El salario debe ser un valor numérico'),
  // Validación del resto de campos (solo revisa que no estén vacíos)
  body('username').trim().notEmpty().withMessage(GENERIC_MSG),
  body('fullname').trim().notEmpty().withMessage(GENERIC_MSG),
  body('cedula').trim().notEmpty().withMessage(GENERIC_MSG),
  body('rol').trim().notEmpty().withMessage(GENERIC_MSG),
  body('empresa').trim().notEmpty().withMessage(GENERIC_MSG),
  body('sede').trim().notEmpty().withMessage(GENERIC_MSG),
  body('cargo').trim().notEmpty().withMessage(GENERIC_MSG),
  body('gerencia').trim().notEmpty().withMessage(GENERIC_MSG),
  body('fechaIngreso').trim().notEmpty().withMessage(GENERIC_MSG),
  body('tallaCamisa').trim().notEmpty().withMessage(GENERIC_MSG),
  body('tallaPantalon').trim().notEmpty().withMessage(GENERIC_MSG),
  body('tallaCalzado').trim().notEmpty().withMessage(GENERIC_MSG),
]
