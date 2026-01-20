const userModel = require("../models/userModel")
const { validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const saltRounds = 10
const GENERIC_MSG = 'CAMPO_REQUERIDO'
const GENERIC_ERROR_TEXT = 'Faltan campos obligatorios por llenar.'

exports.getUsuarios = async (req, res) => {
  try {
    const [users, rols, cargos] = await Promise.all([
      userModel.getAllUsersWithDetails(),
      userModel.getAllRoles(),
      userModel.getAllCargos()
    ]);
    res.render("usuarios", {
      users: users,
      rols: rols,
      cargos: cargos,
      username: req.session.username,
      rol: req.session.rol,
    });
  } catch (err) {
    console.error("Error al obtener datos:", err);
    return res.status(500).send("Error al obtener datos de usuarios");
  }
};

exports.createUsuario = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      const allErrors = errors.array()
      let processedErrors = []
      let genericErrorAdded = false

      for (const error of allErrors) {
        if (error.msg === GENERIC_MSG) {
          if (!genericErrorAdded) {
            processedErrors.push({
              msg: GENERIC_ERROR_TEXT,
              path: 'general'
            });
            genericErrorAdded = true
          }
        } else {
          processedErrors.push(error)
        }
      }
      return res.status(400).json({ errors: processedErrors })
    }
  try {
    const { username, password, fullname, cedula, rol, empresa, sede, cargo, gerencia, salario, fechaIngreso, tallaCamisa, tallaPantalon, tallaCalzado } = req.body
    const resultDatos = await userModel.createDatosUsuario(fullname, cedula, empresa, sede, gerencia, cargo, salario, fechaIngreso, tallaCamisa, tallaPantalon, tallaCalzado)
    const idDatosUsuarios = resultDatos.lastID
    if (!idDatosUsuarios) {
         throw new Error("No se pudo obtener el lastID después de crear datos de usuario")
    }
    const hash = await bcrypt.hash(password, saltRounds);
    await userModel.createUser(username, hash, idDatosUsuarios, rol)
    res.json({ success: "Usuario creado exitosamente" })
  } catch (err) {
    console.error(err)
    return res.status(500).send("Error al insertar usuario")
  }
};

exports.deleteUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    await userModel.deleteDatosUsuario(id);
    res.json({ success: "Usuario borrado exitosamente" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateUsuario = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const allErrors = errors.array()
    let processedErrors = []
    let genericErrorAdded = false

    for (const error of allErrors) {
      if (error.msg === GENERIC_MSG) {
        if (!genericErrorAdded) {
          processedErrors.push({
            msg: GENERIC_ERROR_TEXT,
            path: 'general'
          });
          genericErrorAdded = true
        }
      } else {
        processedErrors.push(error)
      }
    }
    return res.status(400).json({ errors: processedErrors })
  }

  try {
    const id = req.params.id
    const { username, password, fullname, cedula, rol, empresa, sede, cargo, gerencia, salario, tallaCamisa, tallaPantalon, tallaCalzado } = req.body
    const user = await userModel.getUserById(id)
    if (!user) {
      return res.status(404).send("Usuario no encontrado")
    }
    await userModel.updateDatosUsuario(fullname, cedula, empresa, sede, gerencia, cargo, salario, tallaCamisa, tallaPantalon, tallaCalzado, user.idDatosUsuarios)
    if (password === ''){
      await userModel.updateUserWithoutPass(username, rol, id)
      res.json({ success: "Datos actualizado correctamente" })
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      await userModel.updateUser(username, hash, rol, id);
      res.json({ success: "Datos actualizado correctamente" })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send("Error al actualizar el usuario")
  }
}
