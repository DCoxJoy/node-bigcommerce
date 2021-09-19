const { response } = require('express');
const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()
var request = require("request");


//BigCommerce main api connection
const bigCommerce = new BigCommerce({
    clientId: process.env.BC_CLIENTID,
    accessToken: process.env.BC_TOKEN,
    storeHash: "4ccc5gfp0c",
    host: `https://api.bigcommerce.com/stores/{{storeHash}}/v3`,
    responseType: "json"
    
  });

//POST Route sends sku id used as parameter to filter results called on products route
router.post('/',(req,res) => {
  let sku = req.body.sku;
  //using the bigCommerce object to handle creating the properties needed to fill an html template page.
    bigCommerce.get(`/products?sku=${sku}`, (req , res, next)=>{ 

      })
      .then(data => {

        let productid = data.map(data => (
    
          { 
           productid: data.id
          
        }));

 
       

        let custom_fields = data.map(data => ({  custom_fields: productid.custom_fields }));
         let product_images = data.map(data => ({  product_images: productid.images }));

        
        
       
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
           tiny_image: data.primary_image.tiny_url,
           cust_fields_url: data.custom_fields.url
           
        }

        ));
        

        let image_url = `https://api.bigcommerce.com/stores/4ccc5gfp0c/v3/catalog/products/1949/images`
        let url = `https://api.bigcommerce.com/stores/4ccc5gfp0c/v3/catalog/products/1949/custom-fields`
        let options = {
          method: 'GET',
          image_url: image_url,
          url: url,
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-auth-token': 'rmw835hec1nturvs9784ffetp0rkr4u'
          }
        };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          // console.log(JSON.parse(data))
          let data2 = JSON.parse(body)

          var dsheet_benefits_name = data2.data[10].name
          let dsheet_benefits_value = data2.data[10].value

          let dsheet_features_name = data2.data[11].name
          let dsheet_features_value = data2.data[11].value        
          
          // for (let i = 0; i < data.data.length; i++) { 
          //   console.log(data.data[i]);
          // }

          
          
          // console.log(Object.values(JSON.parse(image_url)))

        })
        
       console.log(dsheet_benefits_name)
        // console.log(productid)
        console.log(...productid)
       console.log(...result)
       
              res.render(`products/index`, {
               productid: productid,
               result: result,
               
              
              })
          })
          .catch((err) =>{
              console.error(err)
          })

      

      


})

router.get('/',  (request, response) => {
  console.log(request.params);
  const sku = request.params.sku;
  console.log(sku);
 

 
});

//Add DSheet form
// router.get('/', (req,res) => {
//     res.render('mydsheets/index')
// })

module.exports = router