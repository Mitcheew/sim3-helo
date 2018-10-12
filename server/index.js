// require in dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

// destructure from process.env
const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET
} = process.env;

// connect to db
massive(CONNECTION_STRING)
.then(dbInstance => {
    console.log('Database connected')
    app.set('db', dbInstance)
})
.catch((err) => {
    console.log(err)
});

// Initialize express app
const app = express();

app.use(bodyParser.json());
const c = require('./controller');

// middleware
// app.use(session({
//     secret: SECRET,
//     resave: false,
//     saveUninitialized: false
// }))

// endpoints
app.post(`/api/auth/register`, c.register)
app.post(`/api/auth/login`, c.login)

app.get(`/api/posts/:user_id`, c.read)
app.get(`/api/post/:post_id`, c.getPost)


app.listen(SERVER_PORT, () => { console.log(`Listening on port ${SERVER_PORT}`)})