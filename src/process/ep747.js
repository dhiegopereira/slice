const fs = require('fs');
const path = require('path');
const { Ep747, syncTableEp747 } = require('../models/ep747'); 
const { transaction } = require('../config/database');

async function processFilesInDirectory(directoryPath) {
  try {
    await syncTableEp747();

    const files = fs.readdirSync(directoryPath);
    console.log('Arquivos encontrados:', files);
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      console.log('Processando arquivo:', filePath);
      
      if (fs.statSync(filePath).isFile() && (path.extname(file) === '.txt' || path.extname(file) === '.TXT')) {
        await parseFile(filePath);
      }
    }
  } catch (error) {
    console.error('Erro ao processar arquivos no diretório:', error);
  }
}

async function parseFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');

  const reports = data.split('\f'); 
  await transaction(async (t) => {
    for (const report of reports) {
      if (!report.trim()) continue;
      
      const lines = report.split('\n').map(line => line.trim()).filter(line => line);

      
      const newEp747 = {
        reportId: lines.find(line => line.startsWith('REPORT ID:'))?.split(' ')[3],
        settlementCurrency: lines.find(line => line.startsWith('SETTLEMENT CURRENCY:'))?.split(' ').pop(),
        totalIssuer: parseFloat(lines.find(line => line.startsWith('TOTAL ISSUER'))?.split(' ').pop().replace(/[^0-9.]/g, '')),
        totalReimbursement: parseFloat(lines.find(line => line.startsWith('TOTAL REIMBURSEMENT FEES'))?.split(' ').pop().replace(/[^0-9.]/g, '')),
        totalSettlement: parseFloat(lines.find(line => line.startsWith('NET SETTLEMENT AMOUNT'))?.split(' ').pop().replace(/[^0-9.]/g, ''))
      };
      
      await Ep747.create(newEp747, { transaction: t });
    }
  });
}

module.exports = { processFilesInDirectory };
