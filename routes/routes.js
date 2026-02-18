import express from "express";
import * as inicioController from "../src/controllers/inicio-loginControllers.js";
import * as homeController from "../src/controllers/homeControllers.js";
import * as escalaController from "../src/controllers/escalaControllers.js";
import * as liderancaController from "../src/controllers/liderancaControllers.js";
import * as missaController from "../src/controllers/missaControllers.js";
import * as loginController from "../src/middlewares/middlewares.js";

const router = express.Router()

router.get("/", inicioController.inicioGET);

router.get("/login", inicioController.loginGET);
router.post("/login", inicioController.loginPOST);

router.get("/home", loginController.protegerRotas, homeController.homeGET);


// ------------------ LIDERANÇAS ------------------
router.get("/liderancas",loginController.protegerRotas, liderancaController.liderancaGET);  
router.get("/liderancas/delete/:id",loginController.protegerRotas,liderancaController.liderancaDELETE);  
router.put("/liderancas/edit",loginController.protegerRotas,  liderancaController.liderancaPUT);
router.get("/liderancas/new", loginController.protegerRotas, liderancaController.new_liderancaGET);  
router.post("/liderancas/new",loginController.protegerRotas, liderancaController.new_liderancaPOST);

// ------------------ MISSAS ------------------
router.get("/missas", loginController.protegerRotas, missaController.missaGET);  
router.get("/missas/new",loginController.protegerRotas, missaController.new_missaGET);  
router.post("/missas/new",loginController.protegerRotas, missaController.new_missaPOST);  
router.get("/missas/new_recorrente", loginController.protegerRotas, missaController.new_missa_recorrenteGET); 
router.post("/missas/new_recorrente",loginController.protegerRotas, missaController.new_missa_recorrentePOST);
router.get("/missas/especifica",loginController.protegerRotas, missaController.data_especificaGET);  
router.get("/missas/especifica/delete", loginController.protegerRotas, missaController.missaDELETE);
router.put("/missas/especifica/edit",loginController.protegerRotas, missaController.missaPUT);

// ------------------ ESCALA ------------------
router.get("/escala", escalaController.escalasGET);

export default router;