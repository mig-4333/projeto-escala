import Missa from "../models/missaModels.js";

export const missaGET = async (req,res) => {
    try {
        const missas = await Missa.buscaMissas();
        res.render("missas", { missas });
    }
    catch (error) {
        res.render("erro");
    };
};


export const data_especificaGET = async (req,res) => {
    try{
        const {data_atual, status_delete, status_edit } = req.query;
        const missas = await Missa.buscaMissasData(data_atual);
        res.render("data_especifica", { missas, data_atual, status_edit,status_delete });
    }
    catch (error){
        res.render("erro");
    };
};

export const missaDELETE = async (req,res) => {
    let status_delete;
    const { id,data_atual } = req.query;
    try{
        status_delete = "sucesso";
        await Missa.deletaMissa(id);
    }
    catch (error){
        status_delete = "erro";
    }
    finally {
        res.redirect(`/missas/especifica?data_atual=${data_atual}&status_delete=${status_delete}&id=${id}`);
    };
};

export const missaPUT = async (req,res) => {
    const { id,titulo,qtd_min,desc,data,hora } = req.body;
    const data_atual = req.query.data_atual
    let status_edit;
    try{
        await Missa.editaMissa(id,titulo,qtd_min,desc,data,hora);
        status_edit = "sucesso";
    }
    catch (error){
        status_edit = "erro";
    }
    finally {
        res.redirect(`/missas/especifica?data_atual=${data_atual}&status_edit=${status_edit}`);
    }
}

export const new_missaGET = (req,res) => {
    res.render("form_missa", { status: ""});
};

export const new_missaPOST = async (req,res) => {
    try{
        const { titulo, qtd_min, desc, data, hora } = req.body
        await Missa.criaMissa(titulo,qtd_min,desc,data,hora);
        res.render("form_missa", { status: "sucesso"});
    }
    catch (error) {
        res.render("form_missa", { status: "erro"});
    };
};


export const new_missa_recorrenteGET = (req,res) => {
    try{
        res.render("form_missa_recorrente");
    }
    catch{
        res.render("erro");
    };
};

export const new_missa_recorrentePOST = async (req,res) => {
    try{
        const { titulo, qtd_min, desc, dias_semana, data_inicial,data_final, hora } = req.body;
        await Missa.criaMissaRecorrente(titulo, qtd_min, desc, dias_semana, data_inicial,data_final, hora);
        res.render("form_missa_recorrente", { status: "sucesso"});
    }
    catch (error) {
        res.render("form_missa_recorrente", { status: "erro"});
    };
};

