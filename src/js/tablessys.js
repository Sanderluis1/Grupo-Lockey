const language = {  language: {
                        info: 'Mostrando página _PAGE_ de _PAGES_',
                        emptyTable: 'No hay solicitudes',
                        infoEmpty: 'No hay registros disponibles',
                        infoFiltered: '(Filtrado de _MAX_ registros totales)',
                        lengthMenu: 'Mostrar _MENU_ registros por página',
                        zeroRecords: 'Nada encontrado - Lo sentimos',
                        search: 'Búsqueda'
                    },
                    scrollX: true
                }
const config = {
  search: true
}
const selectElement = document.querySelector('#selectBox');
if (selectElement) {
  dselect(selectElement, config);
}

function format(detallesUsuario, detallesSolicitud, arrayDetallesCapacitacion, tipoSolicitud) {
  let resultado = ""
  switch (tipoSolicitud) {
    case 1:
    resultado = '<p class="h5">Datos del Trabajador:</p>' +
                '<dl class="row g-0">' +
                  '<div class="col-md-2">' +
                    '<dt>Nombres y Apellidos:</dt>' +
                    '<dd>' + detallesUsuario.nombreCompleto + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Cedula:</dt>' +
                    '<dd>' + detallesUsuario.cedula + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Cargo:</dt>' +
                    '<dd>' + detallesUsuario.nombreCargo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Gerencia:</dt>' +
                    '<dd>' + detallesUsuario.gerencia + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Salaria Base:</dt>' +
                    '<dd>' + detallesUsuario.salario + '</dd>' +
                  '</div>' +
                  '<p class="h5">Detalles de la solicitud:</p>' +
                  '<div class="col-md-2">' +
                    '<dt>Dirigido a:</dt>' +
                    '<dd>' + detallesSolicitud.dirigidoA + '</dd>' +
                  '</div>' +
                '</dl>'
    break
    case 2:
    resultado = '<p class="h5">Datos del Trabajador:</p>' +
                '<dl class="row g-0">' +
                  '<div class="col-md-2">' +
                    '<dt>Nombres y Apellidos:</dt>' +
                    '<dd>' + detallesUsuario.nombreCompleto + '</dd>' +
                  '</div>' +
                  '<div class="col-md-1">' +
                    '<dt>Cedula:</dt>' +
                    '<dd>' + detallesUsuario.cedula + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Cargo:</dt>' +
                    '<dd>' + detallesUsuario.nombreCargo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Gerencia:</dt>' +
                    '<dd>' + detallesUsuario.gerencia + '</dd>' +
                  '</div>' +
                  '<p class="h5">Detalles de la solicitud:</p>' +
                  '<div class="col-md-2">' +
                    '<dt>Saldo Solicitado:</dt>' +
                    '<dd>' + detallesSolicitud.monto + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Motivo del Prestamo:</dt>' +
                    '<dd>' + detallesSolicitud.motivo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Justificación:</dt>' +
                    '<dd>' + detallesSolicitud.justificacion + '</dd>' +
                  '</div>' +
                '</dl>'
    break
    case 3:
    resultado = '<p class="h5">Datos del Trabajador:</p>' +
                '<dl class="row g-0">' +
                  '<div class="col-md-2">' +
                    '<dt>Nombres y Apellidos:</dt>' +
                    '<dd>' + detallesUsuario.nombreCompleto + '</dd>' +
                  '</div>' +
                  '<div class="col-md-1">' +
                    '<dt>Cedula:</dt>' +
                    '<dd>' + detallesUsuario.cedula + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Cargo:</dt>' +
                    '<dd>' + detallesUsuario.nombreCargo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Gerencia:</dt>' +
                    '<dd>' + detallesUsuario.gerencia + '</dd>' +
                  '</div>' +
                  '<p class="h5">Detalles de la solicitud:</p>' +
                  '<div class="col-md-2">' +
                    '<dt>Motivo de la solicitud</dt>' +
                    '<dd>' + detallesSolicitud.motivo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Saldo Solicitado:</dt>' +
                    '<dd>' + detallesSolicitud.saldo + '%' + '</dd>' +
                  '</div>' +
                '</dl>'
    break
    case 4:
    resultado = '<p class="h5">Datos del Trabajador:</p>' +
                '<dl class="row g-0">' +
                  '<div class="col-md-2">' +
                    '<dt>Nombres y Apellidos:</dt>' +
                    '<dd>' + detallesUsuario.nombreCompleto + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Empresa:</dt>' +
                    '<dd>' + detallesUsuario.empresa + '</dd>' +
                  '</div>' +
                  '<p class="h5">Detalles de la solicitud:</p>' +
                  '<div class="col-md-2">' +
                    '<dt>Actividad Laborarl y factores asociados:</dt>' +
                    '<dd>' + detallesSolicitud.actividad + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Equipo requerido:</dt>' +
                    '<dd>' + detallesSolicitud.equipo + '</dd>' +
                  '</div>' +
                '</dl>'
    break
    case 5:
    resultado = '<p class="h5">Detalles de la solicitud:</p>' +
                '<dl class="row g-0">' +
                  '<div class="col-md-2">' +
                    '<dt>Nombre Completo del Solicitante:</dt>' +
                    '<dd>' + detallesUsuario.nombreCompleto + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Área de formación:</dt>' +
                    '<dd>' + detallesSolicitud.areaFormacion + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Justificación de la solicitud:</dt>' +
                    '<dd>' + detallesSolicitud.justificacion + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Tipo de Capacitación:</dt>' +
                    '<dd>' + detallesSolicitud.tipoCapacitacion + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Proveedor o Institución Sugerida:</dt>' +
                    '<dd>' + detallesSolicitud.proveedorSugerido + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Dirigido A</dt>' +
                    arrayDetallesCapacitacion.map(nombre => '<dd>' + nombre.nombreCompleto + '</dd>').join('') +
                  '</div>' +
                '</dl>'
    break
    case 6: sql = "SELECT * FROM chequeo WHERE idChequeo = ?"; break
    case 7:
    resultado = '<p class="h5">Datos Generales:</p>' +
                '<dl class="row g-0">' +
                  '<div class="col-md-2">' +
                    '<dt>Empresa:</dt>' +
                    '<dd>' + detallesUsuario.empresa + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Sede:</dt>' +
                    '<dd>' + detallesSolicitud.sede + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Gerencia:</dt>' +
                    '<dd>' + detallesSolicitud.gerencia + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Cargo:</dt>' +
                    '<dd>' + detallesSolicitud.cargo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Supervisor:</dt>' +
                    '<dd>' + detallesSolicitud.supervisor + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Horario:</dt>' +
                    '<dd>' + detallesSolicitud.horario + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Turno:</dt>' +
                    '<dd>' + detallesSolicitud.turno + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Sexo:</dt>' +
                    '<dd>' + detallesSolicitud.sexo + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Tipo de Requisición:</dt>' +
                    '<dd>' + detallesSolicitud.tipoRequisicion + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Tipo de Contratación:</dt>' +
                    '<dd>' + detallesSolicitud.tipoContratacion + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Duración:</dt>' +
                    '<dd>' + detallesSolicitud.duracion + ' meses' +'</dd>' +
                  '</div>' +
                  '<p class="h5">Perfil de los candidatos:</p>' +
                  '<div class="col-md-2">' +
                    '<dt>Formación académica:</dt>' +
                    '<dd>' + detallesSolicitud.formAcademica +'</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Carrera o mención requerida:</dt>' +
                    '<dd>' + detallesSolicitud.carrera + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Experiencia laboral requerida:</dt>' +
                    '<dd>' + detallesSolicitud.experiencia + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Sistema informático requerido:</dt>' +
                    '<dd>' + detallesSolicitud.sistema + '</dd>' +
                  '</div>' +
                  '<div class="col-md-2">' +
                    '<dt>Otro requisito:</dt>' +
                    '<dd>' + detallesSolicitud.otro + '</dd>' +
                  '</div>' +
                '</dl>'
    break
    default: return console.log("No existe ese tipo de solicitud: " + typeof (tipoSolicitud))
  }
  return (resultado)
}

new DataTable('#tableUsers', language)
$(document).ready(function() {
  let table = new DataTable('#tableMisSolicitudes', language, {
      columns: [
          {orderable: false},
          null,
          null,
          null,
          null,
          null
      ],
      order: [[1, 'asc']]
  })
  $('#tableMisSolicitudes tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);
    var idSolicitud = tr.data('id');
    var idTipoSolicitud = tr.data("idtipo")
    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass('shown');
    } else {
      row.child('<div class="text-center p-2">Cargando detalles...</div>').show();
      tr.addClass('shown');

      $.ajax({
          url: '/missolicitudes/detalles/' + idSolicitud + "/" + idTipoSolicitud,
          method: 'GET',
          success: function (respuestaServidor) {
            let arrayDetallesSolicitud = respuestaServidor.detalles;
            let arrayDetallesUsuario = respuestaServidor.detailsUser
            let arrayDetallesCapacitacion = respuestaServidor.detallesCapacitacion
            let detallesUsuario = arrayDetallesUsuario[0];
            let detallesSolicitud = arrayDetallesSolicitud[0]
            row.child(format(detallesUsuario, detallesSolicitud, arrayDetallesCapacitacion, idTipoSolicitud)).show();
          },
          error: function (err) {
              console.error("Error:", err);
              row.child('<div class="text-danger p-2">Ocurrió un error al cargar.</div>').show();
          }
      });
    }
  });
})
$(document).ready(function() {
  let table = new DataTable('#tableGestionSolicitudes', language, {
      columns: [
          {orderable: false},
          null,
          null,
          null,
          null,
          null
      ],
      order: [[1, 'asc']]
  })
  $('#tableGestionSolicitudes tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);
    var idSolicitud = tr.data('id');
    var idTipoSolicitud = tr.data("idtipo")
    var idUsuarioSolicitante = tr.data("idsolicitante")
    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass('shown');
    } else {
      row.child('<div class="text-center p-2">Cargando detalles...</div>').show();
      tr.addClass('shown');

      $.ajax({
          url: '/gestionsolicitudes/detalles/' + idSolicitud + "/" + idTipoSolicitud + "/" + idUsuarioSolicitante,
          method: 'GET',
          success: function (respuestaServidor) {
            let arrayDetallesSolicitud = respuestaServidor.detalles;
            let arrayDetallesUsuario = respuestaServidor.detailsUser
            let arrayDetallesCapacitacion = respuestaServidor.detallesCapacitacion
            let detallesUsuario = arrayDetallesUsuario[0];
            let detallesSolicitud = arrayDetallesSolicitud[0]
            row.child(format(detallesUsuario, detallesSolicitud, arrayDetallesCapacitacion, idTipoSolicitud)).show();
          },
          error: function (err) {
              console.error("Error:", err);
              row.child('<div class="text-danger p-2">Ocurrió un error al cargar.</div>').show();
          }
      });
    }
  });
})
