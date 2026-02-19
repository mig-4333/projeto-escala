import Missa from "../models/missaModels.js";

export const missaGET = async (req,res) => {
    try {
        const id_pastoral = req.session.pastoral_id;
        const missas = await Missa.buscaMissas(id_pastoral);
        res.render("missas", { missas });
    }
    catch (error) {
        res.render("erro");
    };
};


export const data_especificaGET = async (req,res) => {
    try{
        const {data_atual, status_delete, status_edit } = req.query;
        const id_pastoral = req.session.pastoral_id;
        const missas = await Missa.buscaMissasData(id_pastoral, data_atual);
        res.render("data_especifica", { missas, data_atual, status_edit, status_delete });
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
    const data_atual = req.query.data_atual
    let status_edit;
    try{
        console.log(req.body)
        await Missa.editaMissa(req.body);
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
        const id_pastoral = req.session.pastoral_id;
        const dados_missa = { id_pastoral, ...req.body};
        await Missa.criaMissa(dados_missa);
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
        const id_pastoral = req.session.pastoral_id;
        const dados_missa = { id_pastoral, ...req.body };
        await Missa.criaMissaRecorrente(dados_missa);
        res.render("form_missa_recorrente", { status: "sucesso"});
    }
    catch (error) {
        res.render("form_missa_recorrente", { status: "erro"});
    };
};

