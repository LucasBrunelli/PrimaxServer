const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();



const http = require('http')
const { createBluetooth } = require('node-ble')
const { bluetooth, destroy } = createBluetooth()


let dataPassWord = "";
let dataBank = Array(100).fill('');


// Middleware para processar o corpo da requisição como texto
app.use(express.text());




const server = http.createServer(async (req, res) => {
  if (req.url === '/servidores') {
    const adapter = await bluetooth.defaultAdapter()
    if (! await adapter.isDiscovering()) await adapter.startDiscovery()
    const dispositivos = await adapter.getDevices()
    const servidores = []
    for (const dispositivo of dispositivos) {
      const gattServer = await dispositivo.gatt()
      const servicos = await gattServer.getPrimaryServices()
      for (const servico of servicos) {
        servidores.push(servico.uuid)
      }
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(servidores))
  } else {
    res.statusCode = 404
    res.end()
  }
})

process.on('SIGINT', () => {
    destroy()
    server.close()
  })

// maps key = AIzaSyCrfa1EuP78q3dI7Pm7B0RL1UTNKjXvRrw 

// 0   - status de tarefas para a bicicleta espesifica
// 1   - new firmware
// 2   - firmware checksun
// 3   - read firmware
// 4   - location conected bike 

// 11  - nome da bicicleta de id 0000001
// 12  - nome da bicicleta de id 0000002
// 13  - nome da bicicleta de id 0000003

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
        const parametros = dataBank[numeroInteiro];
        res.json({ parametros });
    }else{
        const parametros = "dados bloqueados";
        res.json({ parametros });
    }   
});

router.get("/obter-dados-hex", (req, res) => {

    if(dataPassWord == "lcb4536@"){
        let auxBank = dataBank[1];     
        let cntChar = 0;
        for(let i = 0; i < auxBank.length - 5; i++)
        {
            if(auxBank[i] != '\r'){
                cntChar++;
            }else{
                if(cntChar != 43){
                    let auxNew = auxBank.substring(i);
                    auxBank = auxBank.substring(0,i);
                    auxBank = auxBank + '_'.repeat(43-cntChar);
                    auxBank = auxBank + auxNew;
                    i = i + 44 - cntChar;
                    cntChar = 0;
                }else{
                    cntChar = 0;
                    i++;
                }
            }
        }
        const parametros = auxBank;
        res.send(parametros);
    }else{
        const parametros = "dados bloqueados";
        res.send(parametros);
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

router.get("/local", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/local.html"));
});

router.get("/bluetooth", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/bluetooth.html"));
});

app.use(router);

app.listen(process.env.PORT || 3333, () => {
    console.log("Servidor Rodando");
});