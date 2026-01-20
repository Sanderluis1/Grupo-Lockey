//Mostrar mensajes de error en login
const params = new URLSearchParams(window.location.search)
let message = ''
if (params.get('error') === '1') {
    message = 'Usuario o contraseña incorrectos.'
} else if (params.get('error') === '2') {
    message = 'Inserte datos en ambos campos'
} else if (params.get('error') === '3') {
    message = 'Error en el servidor. '
}

if (message) {
    document.getElementById('errorLogin').innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>`
}

// Codigo para mostrar una vista previa del campo de password
const togglePassword = document.querySelector('#togglePass')
const password = document.querySelector('#floatingPassword')
togglePassword.addEventListener('click', (e) => {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
  password.setAttribute('type', type)
  e.target.classList.toggle('bi-eye')
})
