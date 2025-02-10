const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ep747 = sequelize.define('Ep747', {
  reportId: { type: DataTypes.STRING, allowNull: true },
  settlementCurrency: { type: DataTypes.STRING, allowNull: true },
  totalIssuer: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
  totalReimbursement: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
  totalSettlement: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
}, {
  timestamps: true,
  tableName: 'ep747',
});

const syncTableEp747 = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('Tabela Ep747 sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Ep747:', error);
  }
};

module.exports = { Ep747, syncTableEp747 };
