const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

// Agora, parametrosRecebidos é um array
let parametrosRecebidos = [100];

router.get("/enviar-dados/:params*", (req, res) => {
    const parametros = req.params.params;
    parametrosRecebidos[1] = parametros;
    res.send("Dados recebidos com sucesso!");
});

router.get("/obter-dados", (req, res) => {
    res.json({ parametros: parametrosRecebidos[1] });
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

router.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/contato.html"));
});

app.use(router);

app.listen(process.env.PORT || 3333, () => {
    console.log("Servidor Rodando");
});