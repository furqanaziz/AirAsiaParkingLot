const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { jwtMiddleware, errorsMiddleware } = require('./middlewares');

// routes
const authRouter = require('./routes/auth');
const parkingRouter = require('./routes/parking');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// middleware for route
app.use('/auth', jwtMiddleware, authRouter);
app.use('/parking', jwtMiddleware, parkingRouter);

app.use(errorsMiddleware);

// listening on port
app.listen(process.env.port, () => {
    console.log(`Parking Lot API Running at ${process.env.port}`)
});
