import express from "express";
import * as inicioController from "../src/controllers/inicio-loginControllers.js";
import * as homeController from "../src/controllers/homeControllers.js";
import * as escalaController from "../src/controllers/escalaControllers.js";
import * as liderancaController from "../src/controllers/liderancaControllers.js";
import * as missaController from "../src/controllers/missaControllers.js";

const router = express.Router()

router.get("/", inicioController.inicioGET);

router.get("/login", inicioController.loginGET);

router.get("/home", homeController.homeGET);

router.get("/liderancas", liderancaController.liderancaGET);  // Renderiza tabela das lideranças
router.get("/liderancas/delete/:id",liderancaController.liderancaDELETE);  
router.put("/liderancas/edit", liderancaController.liderancaPUT);

router.get("/liderancas/new", liderancaController.new_liderancaGET);  // Renderiza formulário de nova liderança
router.post("/liderancas/new", liderancaController.new_liderancaPOST);

router.get("/missas", missaController.missaGET);  // Renderiza a visualização das missas (calendário)
router.get("/missas/new", missaController.new_missaGET);  // Renderiza formulário de nova missa (unica)
router.post("/missas/new", missaController.new_missaPOST);  
router.get("/missas/new_recorrente", missaController.new_missa_recorrenteGET);  // Renderiza formulário de nova missa (recorrente)
router.post("/missas/new_recorrente", missaController.new_missa_recorrentePOST);
router.get("/missas/especifica", missaController.data_especificaGET);  // Renderiza a visualização de missas (tabela)
router.get("/missas/especifica/delete", missaController.missaDELETE);
router.put("/missas/especifica/edit", missaController.missaPUT);

router.get("/escala", escalaController.escalasGET);

export default router;