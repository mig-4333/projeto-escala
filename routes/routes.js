const express = require("express");
const router = express.Router();
const inicioController = require("../src/controllers/inicio-loginControllers");
const homeController = require("../src/controllers/homeControllers");
const escalaController = require("../src/controllers/escalaControllers")
const liderancaController = require("../src/controllers/liderancaControllers")
const missaController = require("../src/controllers/missaControllers")


router.get("/", inicioController.inicioGET);

router.get("/login", inicioController.loginGET);

router.get("/home", homeController.homeGET);

router.get("/liderancas", liderancaController.liderancaGET);

router.get("/missas", missaController.missaGET);

router.get("/escala", escalaController.escalasGET);

module.exports = router;