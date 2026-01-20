const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const saltRounds = 10

exports.getLogin = (req, res) => {
  if (req.session.loggedin) {
    return res.redirect("/home");
  }
  res.render("login", { error: req.query.error });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  if(!username||!password){
    return res.redirect("/?error=2")
  }
  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      return res.redirect("/?error=1");
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
      // Éxito: Establece la sesión y redirige a /home
      req.session.loggedin = true;
      req.session.idUser = user.idUsuario;
      req.session.username = username;
      req.session.rol = user.idRol;
      return res.redirect("/home");
    } else {
      // Fracaso: Contraseña incorrecta, redirige con error 1
      return res.redirect("/?error=1");
    }
  } catch (err) {
    console.error(err);
    return res.redirect("/?error=3"); // Error de servidor
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
