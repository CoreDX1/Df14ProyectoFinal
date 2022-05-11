const express = require('express')
const res = require('express/lib/response')
const fs = require('fs')
const {Router} = express
const router = new Router()

router.get('/', (req, res) => {
    res.render('./carts/index.ejs')
})

module.exports = router