const PDFDocument = require('pdfkit')
const path = require('path')
const misSolicitudesModel = require("../models/misSolicitudesModel")

exports.generatePdfConstancia = async (req, res) => {
  const idSolicitud = req.params.id
  const solicitud = await misSolicitudesModel.getSolicitudByID(idSolicitud)
  const idUsuarioSolicitante = solicitud[0].idUsuarioSolicitante
  const userDetails = await misSolicitudesModel.getDetailsUser(idUsuarioSolicitante)
  const solicitudDetails = await misSolicitudesModel.getDetailsSolicitud("1",idSolicitud)
  const nombrecompleto = userDetails[0].nombreCompleto
  const cedula = userDetails[0].cedula
  const ingreso = userDetails[0].salario
  const cargo = userDetails[0].nombreCargo
  const fechaIngreso = userDetails[0].fechaIngreso
  const fechaSolicitud = solicitudDetails[0].fechaSolicitud
  const [fecha, hora] = fechaSolicitud.split(' ')
  const [anio, mes, dia] = fecha.split('-')
  const fechaObjeto = new Date(anio, mes - 1, dia)
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  const fechaCorregida = new Intl.DateTimeFormat('es-ES', opciones).format(fechaObjeto)
  const dirigidoA = solicitudDetails[0].dirigidoA
  try{
    const doc = new PDFDocument({
      size: 'LETTER',
      margin: 50
    })
    const filename = `report-${Date.now()}.pdf`

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-type', 'application/pdf')
    doc.pipe(res)

    const anchoImagen = 250
    const margenSuperior = 20
    const margenTexto = 20
    const alturaVisualReal = 80
    doc.image(path.join(__dirname, '../src/img/logoreport.png'),(doc.page.width - anchoImagen) / 2, margenSuperior, {
      fit: [anchoImagen, 300],
    })
    doc.y = margenSuperior + alturaVisualReal + margenTexto;
    doc.font('Helvetica-Bold')
      .fontSize(24)
      .fillColor('#555555')
      .text('Inversora Lockey C.A.', { align: 'center' })

    // RIF
    doc.moveDown(0.5); // Pequeño espacio
    doc.fontSize(10)
      .fillColor('black') // Volvemos a negro
      .text('RIF:J-00119849-0', { align: 'center' })

    // Título del cuerpo: Constancia de Trabajo
    doc.moveDown(3);
    doc.fontSize(14)
       .text('Constancia de Trabajo', { underline: true, align: 'center' })

    // Fecha
    doc.moveDown(3);
    doc.font('Helvetica')
      .fontSize(12)
      .text(`Los Teques, ${fechaCorregida}`, { align: 'right' })

    // Sección: Destinatario (Att. Sres...)
    doc.moveDown(-1)
    doc.text('Att.', { align: 'left' })
    doc.moveDown(0.5)
       .font('Helvetica-Bold')
    doc.text(`${dirigidoA}`)
    doc.moveDown(0.5)

    // Cuerpo del texto
    doc.moveDown(3)
    doc.fontSize(12)
    doc.font('Helvetica')
      .text('       Por medio de la presente, se hace constar que el ciudadano (a) ', { continued: true, align: 'justify', lineGap: 5})
      .font('Helvetica-Bold')
      .text(`${nombrecompleto}`, { continued: true })
      .font('Helvetica')
      .text(', portador de la C.I. V-', { continued: true })
      .font('Helvetica-Bold')
      .text(`${cedula}`, { continued: true })
      .font('Helvetica')
      .text(', desempeña funciones en esta empresa como ', { continued: true })
      .font('Helvetica-Bold')
      .text(`${cargo} `, { continued: true })
      .font('Helvetica')
      .text('desde el ', { continued: true })
      .font('Helvetica-Bold')
      .text(`${fechaIngreso} `, { continued: true })
      .font('Helvetica')
      .text('devengando ingresos mensuales por ', { continued: true })
      .font('Helvetica-Bold')
      .text(`${ingreso}` , { continued: true })
      .text('$.')

    // --- SECCIÓN DE FIRMA ---

    doc.moveDown(8)
    const anchoLinea = 200
    const xInicio = (doc.page.width - anchoLinea) / 2
    const yPosicion = doc.y

    doc.lineWidth(1)
      .moveTo(xInicio, yPosicion)
      .lineTo(xInicio + anchoLinea, yPosicion)
      .stroke()

    doc.moveDown(0.5)

    doc.font('Helvetica')
      .fontSize(12)
      .text('Atentamente', { align: 'center' })
    doc.font('Helvetica-BoldOblique')
       .text('Lcda. Luisa Ñañez', { align: 'center' })
       .text('Gerente de Capital Humano', { align: 'center' })

    const etiqueta = 'Nota: '
    const contenido = 'Esta constancia va sin enmienda y es válida por tres (3) meses'
    const linea2 = 'Para cualquier consulta favor contactar a la Gerencia de Capital Humano'
    const tamanoFuente = 10

    doc.fontSize(tamanoFuente)
    doc.font('Helvetica-Bold')
    const anchoEtiqueta = doc.widthOfString(etiqueta)
    doc.font('Helvetica')
    const anchoContenido = doc.widthOfString(contenido)
    const anchoTotalLinea1 = anchoEtiqueta + anchoContenido;
    const inicioX = (doc.page.width - anchoTotalLinea1) / 2;

    doc.moveDown(5)
    doc.font('Helvetica-Bold')
       .text(etiqueta, inicioX, doc.y, {
           continued: true
       })
       .font('Helvetica')
       .text(contenido);

    doc.text(linea2, 0, doc.y + 3, {
        align: 'center',
        width: doc.page.width
    });


    // --- PIE DE PÁGINA ---

    doc.page.margins.bottom = 0

    const footerY = doc.page.height - 50
    const margenPagina = 50

    doc.lineWidth(2)
      .moveTo(margenPagina, footerY - 15)
      .lineTo(doc.page.width - margenPagina, footerY - 15)
      .stroke()

    doc.fontSize(10)
      .font('Helvetica')

    doc.text(
      'Dirección: Callejón Los Pinos, Edificio Inceta, Sector El Tambor, Los Teques, Miranda 1201',
      margenPagina,
      footerY - 5,
      {
        align: 'center',
        width: doc.page.width - (margenPagina * 2),
        lineBreak: false
      }
    )

    doc.text(
      'Teléfono: (+58) 212-321.0744 Correo: info@grupolockey.com',
      margenPagina,
      footerY + 10,
      {
        align: 'center',
        width: doc.page.width - (margenPagina * 2),
        lineBreak: false
      }
    )

    doc.end()
  } catch (error) {
    console.error(error)
  }
}
