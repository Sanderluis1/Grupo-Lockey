const solicitudesModel = require('../models/solicitudesModel')

exports.getSolicitudes = async (req, res) => {
  try{
    const datosUsuarios = await solicitudesModel.getAllDetailsUser()

    res.render("solicitudes",{
      datosUsuarios: datosUsuarios,
      iduser: req.session.idUser,
      username: req.session.username,
      rol: req.session.rol,
    })
  } catch(error){
    console.error(error)
  }
}

exports.createConstancia = async (req, res) => {
  const {dirigidoA, tipoSolicitud} = req.body
  const idUser = req.session.idUser
  const constancias = await solicitudesModel.getConstanciasByYear(req.session.idUser)
   if (constancias.length > 2){
    return res.status(400).json({error:"Has alcanzado el número máximo (3) de constancias que se pueden generar automáticamente."})
  } if(!dirigidoA) {
    return res.status(400).json({error: "Inserte datos en todos los campos"})
  }
  try{
    const resultRow = await solicitudesModel.createHistorialSolicitudes(tipoSolicitud, idUser)
    const idConstancia = resultRow.lastID
    await solicitudesModel.createConstancia(idConstancia, dirigidoA, idUser)
    res.json({ success: "Solicitud creada correctamente"})
  } catch(error){
    console.error(error)
  }
}

exports.createPrestamo = async (req, res) => {
  const {monto, motivo, justificacion, tipoSolicitud} = req.body
  const idUser = req.session.idUser
  if(!monto || !motivo || !justificacion){
    return res.status(400).json({error: "Inserte datos en todos los campos"})
  }
  try{
    const resultRow = await  solicitudesModel.createHistorialSolicitudes(tipoSolicitud, idUser)
    const idPrestamo = resultRow.lastID
    await solicitudesModel.createPrestamo(idPrestamo, monto, motivo, justificacion, idUser)
    return res.json({ success: "Solicitud creada correctamente"})
  } catch (error){
    console.error(error)
  }
}

exports.createAdelanto = async (req, res) => {
  const {motivo, saldo, tipoSolicitud} = req.body
  const idUser = req.session.idUser
  if(!motivo || !saldo){
    return res.status(400).json({error: "Inserte datos en todos los campos"})
  } if(saldo > 75){
    return res.status(400).json({error: "Inserte un saldo que este dentro del rango(0-75)%"})
  }
  try{
    const resultRow = await solicitudesModel.createHistorialSolicitudes(tipoSolicitud, idUser)
    const idAdelanto = resultRow.lastID
    await solicitudesModel.createAdelanto(idAdelanto, motivo, saldo, idUser)
    res.json({ success: "Solicitud creada correctamente"})
  } catch(error){
    console.error(error)
  }
}

exports.createEpp = async (req, res) => {
  const {actividad, equipo, tipoSolicitud} = req.body
  const idUser =  req.session.idUser
  if(!actividad || !equipo) {
    return res.status(400).json({error: "Inserte datos en todos los campos"})
  }
  try{
    const resultRow = await solicitudesModel.createHistorialSolicitudes(tipoSolicitud, idUser)
    const idEpp = resultRow.lastID
    await solicitudesModel.createEpp(idEpp, actividad, equipo)
    res.json({ success: "Solicitud creada correctamente"})
  } catch (error) {
    console.error(error)
  }
}

exports.createCapacitacion = async (req, res) => {
  const { dirigidoA, areaFormacion, justificacion, tipoCapacitacion, proveedorSugerido, tipoSolicitud} = req.body
  const idUser = req.session.idUser
  console.log(req.body)
  if(!dirigidoA || !areaFormacion || !justificacion || !tipoCapacitacion || !proveedorSugerido) {
    return res.status(400).json({error: "Por favor llene todos los campos"})
  }
  try {
    const resultRow = await solicitudesModel.createHistorialSolicitudes(tipoSolicitud, idUser)
    const idCapacitacion = resultRow.lastID
    await solicitudesModel.createCapacitacion(idCapacitacion, areaFormacion, justificacion, tipoCapacitacion, proveedorSugerido)
    await solicitudesModel.createDetailsCapacitacion(idCapacitacion, dirigidoA)

    res.json({ success: "Solicitud creada correctamente"})
  } catch(error){
    console.error(error)
  }
}
exports.createRequisicion = async (req, res) => {
  const {tipoSolicitud, empresa, sede, gerencia, cargo, supervisor,
         horario, turno, sexo, tipoRequisicion, tipoContratacion,
         justificacion, duracion, formAcademica, carrera, experiencia,
         sistema, otro} = req.body
  const idUser = req.session.idUser
  console.log(req.body)
  if(!tipoSolicitud || !empresa || !sede || !gerencia || !cargo ||!supervisor ||
    !horario ||!turno ||!sexo ||!tipoRequisicion ||!tipoContratacion ||
    !justificacion ||!duracion ||!formAcademica ||!carrera ||!experiencia ||
    !sistema || !otro){
    return res.status(400).json({error: "Inserte datos en todos los campos"})
  } else if(tipoRequisicion === "Adicional"){
    justificacion = "No Aplica"
  }
  try {
    const resultRow = await solicitudesModel.createHistorialSolicitudes(tipoSolicitud, idUser)
    const idRequisicion = resultRow.lastID
    const params = [idRequisicion, empresa, sede, gerencia, cargo, supervisor,
           horario, turno, sexo, tipoRequisicion, tipoContratacion,
           justificacion, duracion, formAcademica, carrera, experiencia,
           sistema, otro]
    await solicitudesModel.createRequisicion(params)
    res.json({ success: "Solicitud creada correctamente"})
  } catch(error) {
    console.error(error)
  }
}
