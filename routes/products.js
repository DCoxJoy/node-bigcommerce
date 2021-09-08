const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()

const token ='rmw835hec1nturvs9784ffetp0rkr4u'
const clientid = '3mt7gi7jswdubvsppfapvm4x0gmsf7t'



const bigCommerce = new BigCommerce({
    clientId: clientid,
    accessToken: token,
    storeHash: "4ccc5gfp0c",
    host: `https://api.bigcommerce.com/stores/{{storeHash}}/v3`,
    responseType: "json"
    
  });

 

//DSheet index
router.post('/',(req,res) => {
  
  let sku = req.body.sku;
    bigCommerce.get(`/products?sku=${sku}`, (req , res, next)=>{ 
      })
      .then(data => {
         console.log(data)
        //  return res.render('mydsheets/index')
        console.log(sku)
        res.json({
          status: 'success',
          data
          
        })
        const listNames = data.map(function(data){
          let productobj = {
            name: data.name, 
            id: data.id,
            images: data.images.url,
            custom_fields: data.custom_fields
          }
          return productobj
        })
        console.log(listNames)
      }).catch((err) =>{
          console.error(err)
      })
   
})



// router.get('/',  (request, response) => {
//   console.log(request.params);
//   const sku = request.params.sku;
//   console.log(sku);
 
//   const bigcommerce_url = `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?sku=${sku}`;
//   const bigcommerce_response =  fetch(bigcommerce_url);
//   const bigcommerce_data =  bigcommerce_response.json();


//   const data = {
//     products: bigcommerce_data
//   };
//   response.json(data);
// });

//Add DSheet form
router.get('/add', (req,res) => {
    res.render('mydsheets/add')
})

module.exports = router