const { response } = require('express');
const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()


const unirest = require("unirest");


//BigCommerce main api connection
const bigCommerce = new BigCommerce({
    clientId: process.env.BC_CLIENTID,
    accessToken: process.env.BC_TOKEN,
    storeHash: process.env.STOREHASH,
    host: `https://api.bigcommerce.com/{{storeHash}}/stores//v3`,
    responseType: "json"
    
  });

//POST Route sends sku id used as parameter to filter results called on products route
router.post('/',(req,res) => {
  let sku = req.body.sku;
  //using the bigCommerce object to handle creating the properties needed to fill an html template page.
    bigCommerce.get(`/products?sku=${sku}`, (req , res, next)=>{ 
      console.log("bigcommerce get request started")
      })
      .then (data => {
        let productid = data.map(data => (
          { 
           productid: data.id
        }));

        let prodId_value = Object.values(...productid)
        let productid_value = prodId_value[0]
       
        let reqProdImages = unirest("GET", `https://api.bigcommerce.com/stores/${process.env.STOREHASH}/v3/catalog/products/${productid_value}/images`);
        reqProdImages.headers({
          "accept": "application/json",
          "content-type": "application/json",
          "x-auth-token": `${process.env.BC_TOKEN}`
        });
        reqProdImages.end(function (res) {
          if (res.error) throw new Error(res.error);

          for (let i = 0; i < 4; i++) { 
           let product_image = res.body.data[i].url_standard;
           console.log(product_image)
          
          }
        });
        
        let reqCustFields = unirest("GET", `https://api.bigcommerce.com/stores/${process.env.STOREHASH}/v3/catalog/products/${productid_value}/custom-fields`);
        reqCustFields.headers({
            "accept": "application/json",
            "content-type": "application/json",
            "x-auth-token": `${process.env.BC_TOKEN}`
          });


          reqCustFields.end(function (res) {
            if (res.error) throw new Error(res.error);

           let custom_fields = {
            datasheet_benefits: res.body.data[11],
            datasheet_features: res.body.data[12]
          };
           console.log(custom_fields)
           return custom_fields
            
          });

  
    
          let result = data.map(data => (
            { 
             productid: data.id,
             product_name: data.name,
             product_sku: data.sku,
             short_description: data.description,
             upc: data.upc,
             zoom_image: data.primary_image.zoom_url,
             thumbnail_image: data.primary_image.thumbnail_url,
             standard_image: data.primary_image.standard_url,
             tiny_image: data.primary_image.tiny_url
             
           
          }
  
          ));
          
          
          
       console.log(...result)
       
       
              res.render(`products/index`, {
               productid: productid,
               result: result
              
              })
          })
          .catch((err) =>{
              console.error(err)
          })

      

      


})

// router.get('/',  (request, response) => {
//   console.log(request.params);
//   const sku = request.params.sku;
//   console.log(sku);
 

 
// });

//Add DSheet form
// router.get('/', (req,res) => {
//     res.render('mydsheets/index')
// })

module.exports = router