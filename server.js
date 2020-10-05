const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!',
        data: req.body,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})