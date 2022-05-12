const express = require('express')
const fs = require('fs')
const {Router} = express
const router = new Router()



router.get('/:id?', (req, res) => {
    if (req.params.id) {
        try{
            const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
            const id = req.params.id - 1
            const jsonData = JSON.parse(data)
            const dataSelect = jsonData[id]
            res.json(dataSelect)
        }catch(err){
            console.log('Error al leer')
        }

    }else{
        try{
            const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
            const jsonData = JSON.parse(data)
            res.json(jsonData)
        }catch(err){
            console.log('Error al leer')
        }
    }
})

router.post('/', (req, res) => {
    if (req.query.admin) {
        try{
            const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
            let json = JSON.parse(data)
            let h = new Date().getHours(),
                m = new Date().getMinutes()
            let productsNew = {
                "id" : json.length + 1,
                "timestamp": `${h}:${m}`,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "código": req.body.codigo,
                "foto": req.body.foto,
                "precio" : req.body.precio,
                "stock" : req.body.stock
            }
            json.push(productsNew)
            fs.writeFileSync(__dirname + '/../products.json', JSON.stringify(json, null, 2), 'utf8')
            res.json(JSON.parse(data))
        }catch(err) {
            console.log('Error al leer')
        }
    }else{
        res.send( { error : -1, descripcion: "ruta 'x' método 'y' no autorizada "})
    }
})

router.put('/:id', (req, res) => {
    if(req.query.admin){
        let id = req.params.id - 1
        let jsonData = fs.readFileSync(__dirname + '/../products.json')
        let data = JSON.parse(jsonData)
        data[id]["nombre"] = req.body.nombre
        data[id]["descripcion"] = req.body.descripcion
        data[id]["foto"] = req.body.foto
        data[id]["precio"] = req.body.precio
        data[id]["stock"] = req.body.stock
        fs.writeFileSync(__dirname + '/../products.json', (JSON.stringify(data, null, 2)))
        res.json(data)
    }else{
        res.send( { error : -1, descripcion: "ruta 'x' método 'y' no autorizada "})
    }
})

router.delete('/:id', (req, res) => {
    if (req.query.admin) {
        let id = +req.params.id  
        let jsonData = fs.readFileSync(__dirname + '/../products.json')
        let data = JSON.parse(jsonData)
        let newArr = data.map(x => x.id)
        let index = newArr.findIndex(item => item === id)
        data.splice(index, 1)
        fs.writeFileSync(__dirname + '/../products.json', (JSON.stringify(data, null, 2)))
        res.json(data)
    }else{
        res.send( { error : -1, descripcion: "ruta 'x' método 'y' no autorizada "})
    }

})

// router.delete('/:id', (req, res) => {
//     console.log(req.query.admin)
//     console.log(req.params.id)
// })

module.exports = router