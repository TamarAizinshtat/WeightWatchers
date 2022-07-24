const express = require('express');

const app = express();
const db = require('./db/mongoose')
const { port } = require('./config')
const cors = require('cors');

const usersRouter = require('./router/usersRouter')
const meetingRouter = require('./router/meetingRouter')
const diaryRouter = require('./router/diaryRouter')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger/swagger.json');
const { auth, requiresAuth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'Xha1a8WdZdHzd2gouclitgnU7Kvw5qdA',
  issuerBaseURL: 'https://dev-41xsc8-z.us.auth0.com'
};
console.log(new Date());
app.use(express.json());


app.use(cors());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.use('/user',requiresAuth() ,usersRouter)

app.use('/meeting',requiresAuth(), meetingRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use((err, req, res, next) => {
    if (err == 'user not exist') {
        res.status(204).send(err.message)
    }
    else
        res.status(500).send(err.message)
})

db.connect();
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


