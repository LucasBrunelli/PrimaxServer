const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

let valorField1 = ""; // Variável para armazenar o valor de field1

router.get("/enviar-dados", (req, res) => {
    const field1 = req.query.field1;

    // Armazena o valor de field1 na variável
    valorField1 = field1;

    // Envie uma resposta de confirmação ao microcontrolador
    res.send("Dados recebidos com sucesso!");
});

router.get("/obter-dados", (req, res) => {
    // Retorna os dados para a solicitação do cliente (página HTML)
    res.json({ field1: valorField1 });
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