require('dotenv').config();
const { Sequelize } = require('sequelize');

const createDatabase = async () => {
  try {
    const connection = new Sequelize(
      '',
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
      }
    );

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log('Databaza u krijua me sukses ose tashmë ekziston.');
  } catch (error) {
    console.error('Gabim gjatë krijimit të databazës:', error);
  }
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await createDatabase(); 
    await sequelize.authenticate();
    console.log('Lidhja me bazën e të dhënave është e suksesshme.');

    await sequelize.sync(); 
    console.log('Tabela(t) janë krijuar.');
  } catch (error) {
    console.error('Gabim gjatë lidhjes me databazën:', error);
  }
};

connectDB();

module.exports = sequelize;