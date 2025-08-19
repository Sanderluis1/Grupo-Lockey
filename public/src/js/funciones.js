//Mostrar mensajes de error en login
const params = new URLSearchParams(window.location.search)
let message = ''
if (params.get('error') === '1') {
    message = 'Usuario o contraseña incorrectos.'
} else if (params.get('error') === '2') {
    message = 'Error en el servidor. '
}

if (message) {
    document.getElementById('errorLogin').innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>`
}
