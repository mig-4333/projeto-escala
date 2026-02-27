import Missa from "../models/missaModels.js";

export const missaGET = async (req,res) => {
    try {
        const id_pastoral = req.session.pastoral_id;
        const missas = await Missa.buscaMissas(id_pastoral);
        res.render("missas", { missas });
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao carregar registro das missas.");
        res.redirect("erro");
    };
};


export const data_especificaGET = async (req,res) => {
    try{
        const {data_atual } = req.query;
        const id_pastoral = req.session.pastoral_id;
        const missas = await Missa.buscaMissasData(id_pastoral, data_atual);
        res.render("data_especifica", { missas, data_atual });
    }
    catch (error){
        req.flash("error", "Ocorreu algum erro ao carregar registro da missa na data específica.");
        res.redirect("erro");
    };
};

export const missaDELETE = async (req,res) => {
    const { id,data_atual } = req.query;
    try{
        await Missa.deletaMissa(id);
        req.flash("success", "Missa deletada com sucesso.");
    }
    catch (error){
        req.flash("error", "Ocorreu algum erro ao deletar a missa.");
    }
    finally {
        res.redirect(`/missas/especifica?data_atual=${data_atual}&id=${id}`);
    };
};

export const missaPUT = async (req,res) => {
    const data_atual = req.query.data_atual
    try{
        await Missa.editaMissa(req.body);
        req.flash("success", "Missa atualizada com sucesso.");
    }
    catch (error){
        req.flash("error", "Ocorreu algum erro ao atualizar a missa.");
    }
    finally {
        res.redirect(`/missas/especifica?data_atual=${data_atual}`);
    };
};

export const new_missaGET = (req,res) => {
    res.render("form_missa");
};

export const new_missaPOST = async (req,res) => {
    try{
        const id_pastoral = req.session.pastoral_id;
        const dados_missa = { id_pastoral, ...req.body};
        await Missa.criaMissa(dados_missa);
        req.flash("success", "Missa criada com sucesso.");
        res.redirect("/missas/new");
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao criar a missa.");
        res.redirect("/missas/new");
    };
};


export const new_missa_recorrenteGET = (req,res) => {
    try{
        res.render("form_missa_recorrente");
    }
    catch{
        req.flash("error", "Ocorreu algum erro ao carregar o formulário de missa recorrente.");
        res.redirect("erro");
    };
};

export const new_missa_recorrentePOST = async (req,res) => {
    try{
        const id_pastoral = req.session.pastoral_id;
        const dados_missa = { id_pastoral, ...req.body };
        await Missa.criaMissaRecorrente(dados_missa);
        req.flash("success", "Missa recorrente criada com sucesso.");
        res.redirect("/missas/new_recorrente");
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao criar missa recorrente.");
        res.redirect("/missas/new_recorrente");
    };
};

