const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'hej' });
});

// app.listen(3000);
