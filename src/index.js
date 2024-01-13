const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

let dataPassWord = "";
let dataBank = Array(100).fill('');
// maps key = AIzaSyCrfa1EuP78q3dI7Pm7B0RL1UTNKjXvRrw 

// 0   - status de tarefas para a bicicleta espesifica
// 1   - new firmware
// 2   - firmware checksun
// 3   - read firmware

// 11  - nome da bicicleta de id 0000001
// 12  - nome da bicicleta de id 0000002
// 13  - nome da bicicleta de id 0000003

// Middleware para processar o corpo da requisição como texto
app.use(express.text());

// Rota para receber dados da página HTML e armazená-los no dataBank
app.post("/receber-dados/:posicao", (req, res) => {
    const posicao = parseInt(req.params.posicao, 10);
    if(dataPassWord == "lcb4536@"){
        dataBank[posicao] = req.body;
        res.send("Dados recebidos e armazenados com sucesso!"); 
    }else{
        res.send("Dados Bloqueados!");
    }     
});

router.get("/enviar-dados/:params*", (req, res) => {
    const allData = req.params.params;
    const parteInteira = allData.substring(0, 7);
    const numeroInteiro = parseInt(parteInteira, 10);
    if(dataPassWord == "lcb4536@"){
        dataBank[numeroInteiro] = allData.substring(7);
        res.send("Sucesso!");
    }else{
        res.send("Dados Bloqueados!");
    }         
});

router.get("/obter-dados/:params*", (req, res) => {
    const allData = req.params.params;
    const parteInteira = allData.substring(0, 7);
    const numeroInteiro = parseInt(parteInteira, 10);
    if(dataPassWord == "lcb4536@"){
        let parametros = '[' + dataBank[numeroInteiro] + ']';
        parametros[parametros.length - 1] = '\n';
        parametros[parametros.length - 2] = '\r';
        parametros[parametros.length - 3] = ']';
        res.json({ parametros });
    }else{
        let parametros = "dados bloqueados";
        res.json({ parametros });
    }   
});

router.get("/enviar-senha/:params*", (req, res) => {
    const allData = req.params.params;   
    if(allData == "lcb4536@"){
        dataPassWord = allData;
        res.send("Senha correta!");
    }else{
        dataPassWord = "error"
        res.send("Senha invalida!!!!!!");
    }   
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