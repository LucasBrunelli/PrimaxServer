const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

let valorField1 = ""; // Variável para armazenar o valor de field1

router.get("/enviar-dados/:params*", (req, res) => {
    // O parâmetro `params` captura todos os caracteres após "/enviar-dados/"
    const parametros = req.params.params;

    // Faça algo com os parâmetros (por exemplo, armazenar em uma variável ou banco de dados)
    console.log("Parâmetros recebidos:", parametros);

    // Envie uma resposta de confirmação ao microcontrolador
    res.send("Dados recebidos com sucesso!" + parametros);
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