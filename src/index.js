const process = require('./process');

(async () => {
  await Promise.all([
    process.ep747.processFilesInDirectory('./files'),
    process.clearing.processFilesInDirectory('./files')
  ]);
})();
