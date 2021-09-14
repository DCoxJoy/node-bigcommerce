require('dotenv').config();
const expressHbs = require('express-handlebars')
const express = require('express')
const path = require('path')
const cors = require('cors')



const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Handlebars Helpers
const {
    truncate,
    stripTags
} = require('./helpers/hbs')


app.engine('handlebars', expressHbs({
    helpers: {
    truncate: truncate,
    stripTags: stripTags
},
defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', 'views')


const indexRoutes = require('./routes/index')
const productsRoutes = require('./routes/products')

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))




app.use('/',indexRoutes)
app.use('/products',productsRoutes)






app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000'))