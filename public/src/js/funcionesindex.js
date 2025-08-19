const form = document.getElementById('registerUser')
const messageregister = document.getElementById('errorRegister')

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('hide.bs.modal', () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  })
})


form.addEventListener('submit', function(e) {
    e.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    fetch('/usuarios/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                messageregister.innerHTML = `<div class="alert alert-danger" role="alert">${result.error}</div>`
            } else if (result.success) {
                messageregister.innerHTML = `<div class="alert alert-success" role="alert">${result.success}</div>`
                form.reset()
            }
        })
        .catch(err => {
        messageDiv.innerText = 'Error en la conexión con el servidor'
        messageDiv.style.color = 'red'
    })
})

