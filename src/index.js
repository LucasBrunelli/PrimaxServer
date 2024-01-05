const express = require("express")
const path = require("path")
const app = express()
const router = express.Router()

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/home.html"))
})

router.get("/contato", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/contato.html"))
})

app.use(router)
app.listen(process.env.PORT || 3333, ()=>{
    console.log("Servidor Rodando")
})

/*
git remote rm origin
git init
git add .  
git commit -m  
git branch -M main
git remote add origin https://github.com/LucasBrunelli/PrimaxServer.git
git push -u origin main
*/