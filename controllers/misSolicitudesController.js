const misSolicitudesModel = require("../models/misSolicitudesModel")

exports.getMisSolicitudes = async (req, res) => {
  try{
    const solicitudes = await misSolicitudesModel.getSolicitudesByID(req.session.idUser)

    res.render("missolicitudes",{
      solicitudes: solicitudes,
      iduser: req.session.idUser,
      username: req.session.username,
      rol: req.session.rol
    })
  } catch (error) {
    console.error(error)
  }
}

exports.getDetailsbyIdSolicitud = async (req, res) => {
  const idSolicitud = req.params.id
  const tipoSolicitud = req.params.tipo
  try{
    const detailsUser = await misSolicitudesModel.getDetailsUser(req.session.idUser)
    const detalles = await misSolicitudesModel.getDetailsSolicitud(tipoSolicitud, idSolicitud)
    if(tipoSolicitud == 5) {
      const detallesCapacitacion = await misSolicitudesModel.usersCapacitacion(idSolicitud)
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
