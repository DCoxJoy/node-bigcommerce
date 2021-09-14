const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()


const bigCommerce = new BigCommerce({
    clientId: process.env.clientid,
    accessToken: process.env.token,
    storeHash: "4ccc5gfp0c",
    host: `https://api.bigcommerce.com/stores/4ccc5gfp0c/v3`,
    responseType: "json"
    
  });





router.get('/', async (request, response) => {

  bigCommerce.get('/products')
  .then(data => {
    // Catch any errors, or handle the data returned
  }).catch

  
}).catch((err) =>{
  console.error(err)
})

//Add DSheet form
router.get('/add', (req,res) => {
    res.render('mydsheets/add')
})

module.exports = router