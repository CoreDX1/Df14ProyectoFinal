const express = require('express')
const fs = require('fs')
const {Router} = express
const router = new Router()



router.get('/', (req, res) => {
    // if (req.params.id) {
    //     try{
    //         const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
    //         let id = req.params.id
    //         let objeto = JSON.parse(data)
    //         let objetoNew = objeto[id - 1]
    //         console.log(objetoNew)
    //         res.render('./products/index.ejs', {data:[objetoNew]})
    //     }catch(err) {
    //         console.log('Error al leer')
    //     }
    // }else{
    //     try{
    //         const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
    //         res.render('./products/index.ejs', {data:JSON.parse(data)})
    //     }catch(err) {
    //         console.log('Error al leer')
    //     }
    // }
        try{
            const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
            res.render('./products/index.ejs', {data:JSON.parse(data)})
        }catch(err) {
            console.log('Error al leer')
        }
})

router.post('/', (req, res) => {
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
})

router.put('/:id', (req, res) => {
    let id = req.params.id - 1
    let jsonData = fs.readFileSync(__dirname + '/../products.json')
    let data = JSON.parse(jsonData)
    data[id]["name"] = req.body.name
    fs.writeFileSync(__dirname + '/../products.json', (JSON.stringify(data, null, 2)))
    res.json(data)
})

router.delete('/:id', (req, res) => {
    let id = +req.params.id  
    let jsonData = fs.readFileSync(__dirname + '/../products.json')
    let data = JSON.parse(jsonData)
    let newArr = data.map(x => x.id)
    let index = newArr.findIndex(item => item === id)
    data.splice(index, 1)
    fs.writeFileSync(__dirname + '/../products.json', (JSON.stringify(data, null, 2)))
    res.json(data)
})

module.exports = router