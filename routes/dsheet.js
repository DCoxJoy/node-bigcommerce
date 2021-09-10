const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()

const token =''
const clientid = ''



const bigCommerce = new BigCommerce({
    clientId: clientid,
    accessToken: token,
    storeHash: "4ccc5gfp0c",
    host: `https://api.bigcommerce.com/stores/4ccc5gfp0c/v3`,
    responseType: "json"
    
  });

 let sku = `token`;

//DSheet index
// router.get('/',(req,res) => {
  
  
//     bigCommerce.get(`/products?sku=${sku}`, (req , res, next)=>{ 
//       })
//       .then(data => {
//          console.log(req.body.name)
//         //  return res.render('mydsheets/index')
//         console.log(sku)
//         res.json({
//           status: 'success',
//           sku
//         })
//       }).catch((err) =>{
//           console.error(err)
//       })
   
// })


router.get('/:sku', async (request, response) => {
  console.log(request.params);
  const sku = request.params.sku;
  console.log(sku);
 
  const bigcommerce_url = `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?sku=${sku}`;
  const bigcommerce_response = await fetch(bigcommerce_url);
  const bigcommerce_data = await bigcommerce_response.json();


  const data = {
    products: bigcommerce_data
  };
  response.json(data);
});

//Add DSheet form
router.get('/add', (req,res) => {
    res.render('mydsheets/add')
})

module.exports = router