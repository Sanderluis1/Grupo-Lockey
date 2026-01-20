const db = require('../config/db')

exports.getAllDetailsUser = () => {
  return new Promise ((resolve, reject) => {
    const sql = "SELECT u.idUsuario, du.* FROM users u INNER JOIN datosUsuarios du ON u.idDatosUsuarios = du.idDatosUsuarios"
    db.all(sql, (err, rows) => {
      if(err){
        return reject(err)
      }
      resolve(rows)
    })
  })
}
exports.createHistorialSolicitudes = (tipoSolicitud, idUser) => {
  const sql = "INSERT INTO historialSolicitudes (idTipoSolicitud, idUsuarioSolicitante, fechaSolicitud, estado) VALUES (?, ?, datetime('now', 'localtime'), ?)"
  let params = []
  if(tipoSolicitud === "1"){
    params = [tipoSolicitud, idUser, "Aprobada"]
  } else {
    params = [tipoSolicitud, idUser, "Pendiente"]
  }
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err)
      resolve({ lastID: this.lastID})
    })
  })
}

exports.getConstanciasByYear = (idUser) => {
  const sql = "SELECT * FROM historialSolicitudes WHERE strftime('%Y', fechaSolicitud) = strftime('%Y', 'now') AND idUsuarioSolicitante = ?"
  const params = [idUser]

  return new Promise ((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if(err) return reject(err)
      resolve(rows)
    })
  })
}

exports.createConstancia = (idConstancia, dirigidoA, idUser) => {
  const sql = "INSERT INTO constancias (idConstancia, dirigidoA, idUsuario, fechaSolicitud) VALUES (?, ?, ?, datetime('now', 'localtime'))"
  const params = [idConstancia, dirigidoA, idUser]

  return new Promise ((resolve, reject) => {
    db.run(sql,params, function (err) {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

exports.createPrestamo = (idPrestamo, monto, motivo, justificacion, idUser) => {
  const sql = "INSERT INTO prestamos (idPrestamo, idUsuario, monto, motivo, justificacion) VALUES (?, ?, ?, ?, ?)"
  const params = [idPrestamo,idUser, monto, motivo, justificacion]

  return new Promise ((resolve, reject) => {
    db.run (sql, params, function (err) {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

exports.createAdelanto = (idAdelanto, motivo, saldo, idUser) => {
  const sql = "INSERT INTO adelantoPrestaciones (idAdelanto, idUsuario, motivo, saldo) VALUES (?, ?, ?, ?)"
  const params = [idAdelanto, idUser, motivo, saldo]

  return new Promise ((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

exports.createEpp = (idEpp, actividad, equipo) => {
  const sql = "INSERT INTO epp (idEpp, actividad, equipo) VALUES (?, ?, ?)"
  const params = [idEpp, actividad, equipo]

  return new Promise ((resolve, reject) => {
    db.run(sql, params, function (err) {
      if(err) return reject(err)
       resolve(true)
    })
  })
}

exports.createCapacitacion = (idCapacitacion, areaFormacion, justificacion, tipoCapacitacion, proveedorSugerido) => {
  const sql = "INSERT INTO capacitacion (idCapacitacion, areaFormacion, justificacion, tipoCapacitacion, proveedorSugerido) VALUES (?, ? , ?, ?, ?)"
  const params = [idCapacitacion, areaFormacion, justificacion, tipoCapacitacion, proveedorSugerido]

  return new Promise ((resolve, reject) => {
    db.run(sql, params, function(err) {
      if(err) return reject(err)
      resolve(true)
    })
  })
}

exports.createDetailsCapacitacion = (idCapacitacion, dirigidoA) => {
  const promises = dirigidoA.map(user => {
    const sql = "INSERT INTO capacitacion_usuarios (idCapacitacion, idUsuario) VALUES (?, ?)"
    const params = [idCapacitacion, user]

    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) return reject(err)
        resolve(this.lastID)
      })
    })
  })
  return Promise.all(promises)
}

exports.createRequisicion = (params) => {
  const sql = `INSERT INTO requisiciones (idRequisicion, empresa, sede,
         gerencia, cargo, supervisor, horario, turno, sexo, tipoRequisicion,
         tipoContratacion, justificacion, duracion, formAcademica, carrera,
         experiencia, sistema, otro)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  return new Promise ((resolve, reject) => {
    db.run(sql, params, function (err) {
      if(err) return reject(err)
       resolve(true)
    })
  })
}
