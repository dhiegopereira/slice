const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Clearing = sequelize.define('Clearing', {
  arn: { type: DataTypes.STRING, allowNull: true },
  dest_currency: { type: DataTypes.INTEGER, allowNull: true },
  purchase_value: { type: DataTypes.FLOAT, allowNull: true },
  clearing_value: { type: DataTypes.FLOAT, allowNull: true },
  clearing_commission: { type: DataTypes.FLOAT, allowNull: true },
}, {
  timestamps: true,
  tableName: 'clearing'
});

const syncTableClearing = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('Tabela Clearing sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Clearing:', error);
  }
};

module.exports = { Clearing, syncTableClearing };
