const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})