const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Adicione este middleware para lidar com dados JSON

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

router.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/contato.html"));
});

router.post("/enviar-dados", (req, res) => {
    const dadosRecebidos = req.body;

    // Envia os dados como resposta JSON
    res.json({ dadosRecebidos });
});

app.use(router);

app.listen(process.env.PORT || 3333, () => {
    console.log("Servidor Rodando");
});