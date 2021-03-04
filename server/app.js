require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const errHandler = require('./middlewares/errHandler.js');
const router = require('./routes/index.js');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errHandler);

app.listen(port, (_) => {
    console.log(`YTR app is listening on http://localhost:${port}`);
});
