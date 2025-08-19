const language = {  language: { 
                        info: 'Mostrando página _PAGE_ de _PAGES_', 
                        infoEmpty: 'No hay registros disponibles', 
                        infoFiltered: '(Filtrado de _MAX_ registros totales)', 
                        lengthMenu: 'Mostrar _MENU_ registros por página', 
                        zeroRecords: 'Nada encontrado - Lo sentimos',
                        search: 'Busqueda' 
                    },
                    scrollX: true
                }
const config = {
    search: true
}
dselect(document.querySelector('#selectBox'), config)

                
new DataTable('#tableUsers', language)