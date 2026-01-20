const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get("/", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

// Rutas simples que solo necesitan requireAuth
router.get("/home", requireAuth, (req, res) => {
    res.render("home", { username: req.session.username, rol: req.session.rol });
});

router.get("/403", requireAuth, (req, res) => {
    res.render("403", { username: req.session.username, rol: req.session.rol });
});

module.exports = router;
