const db = require('../config/db')

exports.getSolicitudesByID = (idUser) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT idSolicitud, hs.idTipoSolicitud, nombreSolicitud, idUsuarioSolicitante, fechaSolicitud, fechaRecepcion, estado FROM historialSolicitudes as hs INNER JOIN tipoSolicitud as tp ON hs.idTipoSolicitud = tp.idTipoSolicitud WHERE idUsuarioSolicitante = ?"
    db.all(sql, [idUser], (err, rows) => {
      if(err){
        return reject(err)
      }
      resolve(rows)
    })
  })
}

exports.getSolicitudByID = (idSolicitud) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM historialSolicitudes WHERE idSolicitud = ?"
    db.all(sql, [idSolicitud], (err, rows) => {
      if(err){
        return reject(err)
      }
      resolve(rows)
    })
  })
}

exports.getDetailsUser = (idUser) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT du.*, c.nombreCargo FROM users u INNER JOIN datosUsuarios du ON u.idDatosUsuarios = du.idDatosUsuarios INNER JOIN cargos c ON du.idCargo = c.idCargo WHERE idUsuario = ?"
    db.all(sql, [idUser], (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}

exports.getDetailsSolicitud = (tipoSolicitud, idSolicitud) => {
  let sql = ""
  const params = [idSolicitud]
  return new Promise((resolve, reject) => {
    switch (tipoSolicitud) {
      case "1": sql = "SELECT * FROM constancias WHERE idConstancia = ?"; break
      case "2": sql = "SELECT * FROM prestamos WHERE idPrestamo = ?"; break
      case "3": sql = "SELECT * FROM adelantoPrestaciones WHERE idAdelanto = ?"; break
      case "4": sql = "SELECT * FROM epp WHERE idEpp = ?"; break
      case "5": sql = "SELECT * FROM capacitacion WHERE idCapacitacion = ?"; break
      case "6": sql = "SELECT * FROM chequeo WHERE idChequeo = ?"; break
      case "7": sql = "SELECT * FROM requisiciones WHERE idRequisicion = ?"; break
      default: return reject(new Error ("No existe ese tipo de solicitud: " + tipoSolicitud))
    }
    db.all(sql, params, (err, rows) => {
      if(err){
        return reject(err)
      }
      resolve(rows)
    })
  })
}

exports.usersCapacitacion = (idCapacitacion) => {
  return new Promise ((resolve, reject) => {
    const sql = "SELECT du.nombreCompleto, du.cedula FROM users u INNER JOIN datosUsuarios du ON u.idDatosUsuarios = du.idDatosUsuarios JOIN capacitacion_usuarios cu ON u.idUsuario = cu.idUsuario WHERE cu.idCapacitacion = ?"
    const params = [idCapacitacion]
    db.all(sql, params, (err, rows) => {
      if(err) return reject(err)
      resolve(rows)
    })
  })
}
