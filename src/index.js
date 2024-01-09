const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

let dataBank = Array(100).fill('');
// maps key = AIzaSyCrfa1EuP78q3dI7Pm7B0RL1UTNKjXvRrw 

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