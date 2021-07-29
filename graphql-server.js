const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/index');
const app = express();

app.use(
    '/GraphQL',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

//server
app.listen(process.env.PORT_GraphQL, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT_GraphQL}`)
})