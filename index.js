const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const bodyParser = require('body-parser');
const CokieParser = require('cookie-parser');
const router = express.Router();
require('dotenv').config();
const Router = require('./api/routes/index');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

database.connect();
app.use(CokieParser());
Router(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

