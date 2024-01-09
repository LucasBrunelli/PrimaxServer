const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

let dataBank = Array(100).fill('');
// maps key = AIzaSyCrfa1EuP78q3dI7Pm7B0RL1UTNKjXvRrw 

// Middleware para processar o corpo da requisição como texto
app.use(express.text());

// Rota para receber dados da página HTML e armazená-los no dataBank
app.post("/receber-dados/:posicao", (req, res) => {
    const posicao = parseInt(req.params.posicao, 10);

    // Verifica se a posição é válida
    if (posicao >= 0 && posicao < 100) {
        dataBank[posicao] = req.body;
        res.send("Dados recebidos e armazenados com sucesso!");
    } else {
        res.status(400).send("Posição inválida no dataBank.");
    }
});

// Rota para ler dados do dataBank
router.get("/ler-dados/:posicao", (req, res) => {
    const posicao = parseInt(req.params.posicao, 10);

    // Verifica se a posição é válida
    if (posicao >= 0 && posicao < 100) {
        const parametros = dataBank[posicao];
        res.json({ parametros });
    } else {
        res.status(400).json({ error: "Posição inválida no dataBank." });
    }
});




router.get("/enviar-dados/:params*", (req, res) => {
    const allData = req.params.params;
    const parteInteira = allData.substring(0, 7);
    const numeroInteiro = parseInt(parteInteira, 10);
    dataBank[numeroInteiro] += allData.substring(7);
    res.send("Success!");
});

router.get("/obter-dados/:params*", (req, res) => {
    const allData = req.params.params;
    const parteInteira = allData.substring(0, 7);
    const numeroInteiro = parseInt(parteInteira, 10);
    const parametros = dataBank[numeroInteiro];
    res.json({ parametros });
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

router.get("/terminal", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/terminal.html"));
});

router.get("/bootloader", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/bootloader.html"));
});

app.use(router);

app.listen(process.env.PORT || 3333, () => {
    console.log("Servidor Rodando");
});