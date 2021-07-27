const express = require('express');
const bodyParser = require('body-parser');
const adherentRoutes = require('./routes/adherent.routes');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/adherent', adherentRoutes);

app.use(
    '/GraphQL',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

//server
app.listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT}`)
})