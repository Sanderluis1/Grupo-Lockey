//Variables Global
const togglePassword = document.querySelectorAll('.togglePassword')
const formsEdit = document.querySelectorAll(".editUser");
const messageDeleteUser = document.getElementById("messageDeleteUser");
const formsWithMessage = document.querySelectorAll(".formsWithMessage")
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("hide.bs.modal", () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach(link => {
    if (link.pathname === currentPath) {
      link.classList.add('active')
      link.setAttribute('aria-current', 'page');
    }
  })
})

// Codigo para contar la cantidad de caracteres en los textareas
const textareas = document.querySelectorAll(".character-limit");
textareas.forEach((textarea) => {
  const contadorSpan =
    textarea.nextElementSibling.querySelector(".character-counter");
  const actualizarContador = () => {
    const cantidad = textarea.value.length;
    contadorSpan.textContent = cantidad;
  };
  textarea.addEventListener("input", actualizarContador);
  actualizarContador();
});
// Codigo para mostrar una vista previa del campo de password
togglePassword.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    const icon = e.target
    const password = icon.previousElementSibling
    if (password && password.classList.contains('showPassword')){
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
      password.setAttribute('type', type)
      icon.classList.toggle('bi-eye')
      icon.classList.toggle('bi-eye-slash')
    }
  })
})

// Scripts del modulo de usuarios:
// Script POST del modulo de usuarios
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("registerUser")
  const messageregister = document.getElementById("messageregister")

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (messageregister) {
        messageregister.innerHTML = "";
      }
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries())

      fetch("/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((response) => {
        return response.json().then(body => ({
          ok: response.ok,
          body: body
        }));
      })
      .then((result) => {
        if (!messageregister) {
          return;
        }
        if (!result.ok) {
          let errorHtml = '<strong>Por favor corrige los siguientes errores:</strong><ul>';
          if (result.body.errors && Array.isArray(result.body.errors)) {
            for (const error of result.body.errors) {
              errorHtml += `<li>${error.msg}</li>`;
            }
          } else {
            errorHtml += `<li>Ocurrió un error desconocido.</li>`;
          }
          errorHtml += '</ul>';
          messageregister.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <i class="bi bi-exclamation-triangle-fill"></i> ${errorHtml}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                      </div>`
        } else {
          messageregister.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <i class="bi bi-check-circle-fill"></i> ${result.body.success}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                      </div>`
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
      });
    });
  }
});

// Script DELETE del modulo de usuarios
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    fetch(`/usuarios/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          messageDeleteUser.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <i class="bi bi-exclamation-triangle-fill"></i>
                                        ${result.error}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                      </div>`;
        } else if (result.success) {
          messageDeleteUser.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <i class="bi bi-check-circle-fill"></i>
                                        ${result.success}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                      </div>`;
          const table = $("#tableUsers").DataTable();
          const row = $(e.target).closest("tr");
          table.row(row).remove().draw();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
// Script PUT del modulo de usuarios
formsEdit.forEach((formEdit) => {
  formEdit.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = formEdit.dataset.userid;
    const messageEdit = formEdit.querySelector(".messageEdit");
    const formData = new FormData(formEdit);
    const data = Object.fromEntries(formData.entries());

    fetch(`/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((response) => {
      return response.json().then(body => ({
        ok: response.ok,
        body: body
      }));
    })
    .then((result) => {
      if (!messageEdit) {
        return;
      }
      if (!result.ok) {
        let errorHtml = '<strong>Por favor corrige los siguientes errores:</strong><ul>';
        if (result.body.errors && Array.isArray(result.body.errors)) {
          for (const error of result.body.errors) {
            errorHtml += `<li>${error.msg}</li>`;
          }
        } else {
          errorHtml += `<li>Ocurrió un error desconocido.</li>`;
        }
        errorHtml += '</ul>';
        messageEdit.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                      <i class="bi bi-exclamation-triangle-fill"></i> ${errorHtml}
                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`
      } else {
        messageEdit.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                      <i class="bi bi-check-circle-fill"></i> ${result.body.success}
                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
  });
});

//Scripts del modulo de solicitudes:

//Script POST de las solicitudes
formsWithMessage.forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const messageSolicitud = form.querySelector(".messageSolicitud")
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    for (const [key, value] of formData.entries()) {
      if (key.endsWith('[]')) {
        const cleanKey = key.slice(0, -2);
        if (!data[cleanKey]) {
            data[cleanKey] = [];
        }
        data[cleanKey].push(value);
      } else {
        data[key] = value;
      }
    }
    fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          messageSolicitud.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                          <i class="bi bi-exclamation-triangle-fill"></i> ${result.error}
                                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`;
        } else if (result.success) {
          messageSolicitud.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                          <i class="bi bi-check-circle-fill"></i> ${result.success}
                                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`;
          form.reset();
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });
})
//Script PUT de las solicitudes
const messageSolicitud = document.getElementById('messageSolicitud')
const botonesSolicitudes = document. querySelectorAll('.botonRecepcion')
botonesSolicitudes.forEach((boton) => {
  boton.addEventListener('click', async () => {
    const idSolicitud = boton.dataset.id
    const res = boton.dataset.res
    try {
     fetch(`/gestionsolicitudes/${res}/${idSolicitud}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
     })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          messageSolicitud.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                          <i class="bi bi-check-circle-fill"></i> ${result.success}
                                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`


        } else {
          messageSolicitud.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                          <i class="bi bi-exclamation-triangle-fill"></i>
                                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`
        }
      })


    } catch (error) {
        console.error("Error de red:", error);
    }
  });
})
