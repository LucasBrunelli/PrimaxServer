const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

let parametrosRecebidos = Array(100).fill('');

router.get("/enviar-dados/:params*", (req, res) => {
    // O parâmetro `params` captura todos os caracteres após "/enviar-dados/"
    const allData = req.params.params;

    // Extrai os primeiros 7 caracteres da string
    const parteInteira = allData.substring(0, 7);

    // Converte a parte inteira para um número inteiro
    const numeroInteiro = parseInt(parteInteira, 10);

    // Armazena a parte restante da string na primeira posição do array
    parametrosRecebidos[numeroInteiro] = allData.substring(7);

    // Envie uma resposta de confirmação ao microcontrolador
    res.send("Dados recebidos com sucesso!");
});

router.get("/obter-dados", (req, res) => {
    // Retorna a string contida na primeira posição do array
    const parametros = parametrosRecebidos[0];

    // Envia a resposta para a solicitação do cliente (página HTML)
    res.json({ parametros });
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