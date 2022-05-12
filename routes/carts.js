const express = require('express')
const { json } = require('express/lib/response')
const fs = require('fs')
const { send } = require('process')
const {Router} = express
const router = new Router()

router.get('/', (req, res) => {
    try{
        const data = fs.readFileSync(__dirname + '/../carts.json', 'utf8')
        let jsonData = JSON.parse(data)
        let arr = jsonData[0].productos
        res.render('./carts/index', {data:arr})
    }catch{

    }
})

router.post('/', (req, res) => {
    try{
        const data = fs.readFileSync(__dirname + '/../carts.json', 'utf8')
        const json = JSON.parse(data)
        let h = new Date().getHours(),
            m = new Date().getMinutes()
        let productsNew = {
            "id" : json.length + 1,
            "timestamp": `${h}:${m}`,
            "productos": []
        }
        json.push(productsNew)
        fs.writeFileSync(__dirname + '/../carts.json', JSON.stringify(json, null, 2), 'utf8')
        res.json(json)
    }catch(err) {
        console.log('Error al leer')
    }
})

router.post('/:id/productos', (req, res) => {
    try{
        const data = fs.readFileSync(__dirname + '/../products.json', 'utf8')
        const jsonData = JSON.parse(data)
        const ids = +req.params.id
        const newArr = jsonData.map(x => x.id)
        const selecArr = newArr.findIndex(item => item === ids)
        let addArr = jsonData[selecArr]

        let carts = fs.readFileSync(__dirname + '/../carts.json', 'utf8')
        let jsonCarts = JSON.parse(carts)
        // jsonCarts.push(addArr)
        jsonCarts[0].productos.push(addArr)
        fs.writeFileSync(__dirname + '/../carts.json', (JSON.stringify(jsonCarts, null, 2)))
        res.json(jsonCarts)
    }catch(err){
        console.log('Erro al agregar')
    }
})

router.delete('/:id', (req, res) => {
    try{
        let data = fs.readFileSync(__dirname + '/../carts.json', 'utf8')
        let id = +req.params.id
        console.log(id)
        let jsonData = JSON.parse(data)
        const newArr = jsonData.map(x => x.id)
        const index = newArr.findIndex(item => item === id)
        jsonData.splice(index, 1)
        fs.writeFileSync(__dirname + '/../carts.json', (JSON.stringify(jsonData, null, 2)))
        res.json(jsonData)
    }catch{
        console.log('Error al borrar')
    }
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    try{
        let data = fs.readFileSync(__dirname + '/../carts.json', 'utf8')
        let id = +req.params.id  
        let idProd = +req.params.id_prod

        let jsonData = JSON.parse(data)
        const newArr = jsonData.map(x => x.id)
        const index = newArr.findIndex(item => item === id)

        let selectData = jsonData[index].productos
        const selectId = selectData.map(x => x.id)
        const selectIndex = selectId.findIndex(item => item === idProd)
        selectData.splice(selectIndex, 1)
        fs.writeFileSync(__dirname + '/../carts.json', (JSON.stringify(jsonData, null, 2)))
        res.json(jsonData)
    }catch{
        console.log('Error al borrar')
    }

})

module.exports = router