import Missa from "../models/missaModels";
import Lideranca from "../models/liderancaModels"
import Disponibilidade from "../models/disponibilidadeModels"; 

export const disponibilidadeGET = async (req,res) => {
    const missas = await Missa.buscaMissas(req.session.pastoral_id);
    const liderancas = await Lideranca.buscaLiderancas(req.session.pastoral_id);
    res.render("disponibilidade", { missas, liderancas });
};

export const buscaDadosModalDisponibilidade = async (req, res) => {
    const id_missa = req.params.id;
    const disponibilidades =  await Disponibilidade.buscaDisponibilidadesMissaEspecifica(id_missa);
    res.json( {disponibilidades} );
};

export const registra_disponibilidade = async (req,res) => {
    const id_missa = req.body.id_missa;
        console.log(id_missa)
    delete req.body.id_missa;
    const dados_disponibilidade = req.body;
    await Disponibilidade.registraDisponibilidades(dados_disponibilidade, id_missa);
    res.redirect("/disponibilidade");
};
