const expressHbs = require('express-handlebars')
const express = require('express')
const path = require('path')
const cors = require('cors')

const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');




const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', expressHbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const productsRoutes = require('./routes/products')

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))



app.use('/admin',adminRoutes)
app.use('/',shopRoutes)
app.use('/products',productsRoutes)






app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'))