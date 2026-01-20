const db = require('../config/db');

exports.findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getAllUsersWithDetails = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT u.idUsuario, u.username, u.passwordHash, u.idRol, du.* FROM users u INNER JOIN datosUsuarios du ON u.idDatosUsuarios = du.idDatosUsuarios",
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

exports.getAllRoles = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM rol", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getAllCargos = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM cargos", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.createUser = (username, hash, idDatosUsuarios, rol) => {
  const sql = "INSERT INTO users (username, passwordHash, idDatosUsuarios, idRol, createdAt) VALUES (?, ?, ?, ?, datetime('now', 'localtime'))";
  const params = [username, hash, idDatosUsuarios, rol];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

exports.createDatosUsuario = (fullname, cedula, empresa, sede, gerencia, cargo, salario, fechaIngreso, tallaCamisa, tallaPantalon, tallaCalzado) => {
  const sqlD = "INSERT INTO datosUsuarios (nombreCompleto, cedula, empresa, sede, gerencia, idCargo, salario, tallaCamisa, tallaPantalon, tallaCalzado, fechaIngreso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const paramsD = [fullname, cedula, empresa, sede, gerencia, cargo, salario, tallaCamisa, tallaPantalon, tallaCalzado, fechaIngreso];

  return new Promise((resolve, reject) => {
    db.run(sqlD, paramsD, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

exports.deleteDatosUsuario = (idDatosUsuarios) => {
  const sql = "DELETE FROM datosUsuarios WHERE idDatosUsuarios = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, idDatosUsuarios, function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE idUsuario = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.updateDatosUsuario = (fullname, cedula, empresa, sede, gerencia, cargo, salario, tallaCamisa, tallaPantalon, tallaCalzado, idDatosUsuarios) => {
  const sqlD = "UPDATE datosUsuarios SET nombreCompleto = ?, cedula = ?, empresa = ?, sede = ?, gerencia = ?, idCargo = ?, salario = ?, tallaCamisa = ?, tallaPantalon = ?, tallaCalzado = ? WHERE idDatosUsuarios = ?";
  const paramsD = [fullname, cedula, empresa, sede, gerencia, cargo, salario, tallaCamisa, tallaPantalon, tallaCalzado, idDatosUsuarios];

  return new Promise((resolve, reject) => {
    db.run(sqlD, paramsD, function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

exports.updateUser = (username, hash, rol, id) => {
  const sql = "UPDATE users SET username = ?, passwordHash = ?, idRol = ?, createdAt = datetime('now', 'localtime') WHERE idUsuario = ?";
  const params = [username, hash, rol, id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

exports.updateUserWithoutPass = (username, rol, id) => {
  const sql = "UPDATE users SET username = ?, idRol = ?, createdAt = datetime('now', 'localtime') WHERE idUsuario = ?";
  const params = [username, rol, id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};
