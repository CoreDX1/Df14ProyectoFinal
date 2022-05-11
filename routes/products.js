const express = require('express')
const fs = require('fs')
const {Router} = express
const router = new Router()



router.get('/', (req, res) => {
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
        let oj = req.body
        json.push(oj)
        try{
            const write = fs.writeFileSync(__dirname + '/../products.json', JSON.stringify(json, null, 2), 'utf8')
            console.log(json)
            return write
        }catch(err){
            console.log('Error al Escribir')
        }
        res.send('Se Guardo')
    }catch(err) {
        console.log('Error al leer')
    }
})

module.exports = router