const express = require('express')
const productosRoutes = require('./routes/products')
const app = express()

app.use( express.static(( __dirname, './static')));
app.set('view engine', 'ejs')
app.set('views', './public')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/productos', productosRoutes)

app.listen(8080, () => {
    console.log('Server on')
})