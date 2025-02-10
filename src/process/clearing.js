const fs = require('fs');
const path = require('path');
const { Clearing, syncTableClearing } = require('../models/clearing');
const { transaction } = require('../config/database');

async function processFilesInDirectory(directoryPath) {  
  try {
    await syncTableClearing();

    const files = fs.readdirSync(directoryPath);
    console.log('Arquivos encontrados:', files);
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      console.log('Processando arquivo:', filePath);
      
      if (fs.statSync(filePath).isFile() && path.extname(file).toLowerCase() === '.json') {
        await parseFile(filePath);
      }
    }
  } catch (error) {
    console.error('Erro ao processar arquivos no diretório:', error);
  }
}

async function parseFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const transactions = JSON.parse(data);
    
    await transaction(async (t) => {
      for (const transactionData of transactions) {
        const newClearing = {
          arn: transactionData.arn,
          dest_currency: transactionData.dest_currency,
          purchase_value: transactionData.purchase_value,
          clearing_value: transactionData.clearing_value,
          clearing_commission: transactionData.clearing_commission
        }
        await Clearing.create(newClearing, { transaction: t });
        console.log('Transação salva no banco:', newClearing);
      }
    });
  } catch (error) {
    console.error('Erro ao processar arquivo JSON:', filePath, error);
  }
}

module.exports = { processFilesInDirectory };
