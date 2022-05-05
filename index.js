const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('static'))

app.listen(port, () => console.log(`Listening on localhost:${port}`));