require('dotenv').config();
const express = require('express');
const sequelize = require('./db'); // Sigurohu që emri është i saktë

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mirë se vini në serverin tuaj!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon në portin ${PORT}`);
});
