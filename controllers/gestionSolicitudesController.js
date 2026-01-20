const gestionSolicitudesModel = require('../models/gestionSolicitudesModel')

exports.getAllSolicitudes = async (req, res) => {
  try{
    const solicitudes = await gestionSolicitudesModel.getAllSolicitudes()

    res.render("gestionsolicitudes", {
      solicitudes: solicitudes,
      idUser: req.session.idUser,
      username: req.session.username,
      rol: req.session.rol
    })
  } catch(error) {
    console.error(error)
  }
}

exports.resSolicitud = async (req, res) => {
  const idUser = req.session.idUser
  const recepcion = req.params.res
  const idSolicitud = req.params.idSolicitud
  try{
    if(recepcion === "0"){
      await gestionSolicitudesModel.denySolicitud(idUser, idSolicitud)
      res.json({ success: "La solicitud ha sido denegada"})
    } else if(recepcion === "1"){
      await gestionSolicitudesModel.allowSolicitud(idUser, idSolicitud)
      res.json({ success: "La solicitud ha sido aprobada exitosamente"})
    }
  } catch(error) {
    console.error(error)
  }
}

exports.getDetailsbyIdSolicitud = async (req, res) => {
  const idSolicitud = req.params.id
  const tipoSolicitud = req.params.tipo
  const idUsuarioSolicitante = req.params.usuario
  try{
    const detailsUser = await gestionSolicitudesModel.getDetailsUser(idUsuarioSolicitante)
    const detalles = await gestionSolicitudesModel.getDetailsSolicitud(tipoSolicitud, idSolicitud)
    if(tipoSolicitud == 5) {
      const detallesCapacitacion = await gestionSolicitudesModel.usersCapacitacion(idSolicitud)
      return res.json({
        detailsUser: detailsUser,
        detalles: detalles,
        detallesCapacitacion: detallesCapacitacion
      })
    }
    res.json({
      detailsUser: detailsUser,
      detalles: detalles
    })
  } catch (error) {
    console.error(error)
  }
}
