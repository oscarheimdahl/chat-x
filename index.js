const express = require('express');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'hej' });
});

app.listen(process.env.PORT || 3000);
