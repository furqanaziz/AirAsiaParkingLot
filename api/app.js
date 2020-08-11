const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { jwtMiddleware, errorsMiddleware } = require('./middlewares');

// routes
const authRouter = require('./routes/auth');
const parkingRouter = require('./routes/parking');

const app = express();

// pkg middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// routes middlewares
app.use('/auth', authRouter);
app.use('/parking', jwtMiddleware, parkingRouter);

app.use(errorsMiddleware);

// listening on port
app.listen(process.env.PORT, () => {
    console.log(`Parking Lot API Running at ${process.env.PORT}`)
});
