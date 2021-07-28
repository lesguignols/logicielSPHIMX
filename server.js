const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const adherentRoutes = require('./routes/adherent.routes');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkAdherent, requireAuth } = require('./middleware/auth.middleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get('*', checkAdherent);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.adherent.id)
})


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