
require('dotenv').config({ path: '.env' });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const disconnect = async () => {
  try {
    await sequelize.close();
    console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to close the database connection:', error);
  }
};

const transaction = async (fn) => {
  await connect();

  const t = await sequelize.transaction();
  try {
    const result = await fn(t);
    await t.commit();
    return result;
  } catch (error) {
    await t.rollback();
    console.error('Transaction error:', error);
    throw error;
  } finally {
    await disconnect();
  }
};

module.exports = {
  transaction,
  sequelize,
};