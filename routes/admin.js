const express = require('express')
const router = express.Router()

router.get('/search', (req, res, next) => {
    res.send('<form action="/products" method="GET"><input type="text" name="sku"><button type="submit">Search Product</button></form>')

  });

  

router.use(`/products/:sku`, (sku, res, next) => {

  res.render('add-branding')
    
  });

module.exports = router
