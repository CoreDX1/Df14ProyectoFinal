const express = require('express')
const productosRoutes = require('./routes/products')
const app = express()

app.use("/static", express.static('./static/'));
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/productos', productosRoutes)

app.listen(8080, () => {
    console.log('Server on')
})