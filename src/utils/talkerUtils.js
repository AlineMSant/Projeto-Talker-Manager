const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

const readTalker = async () => {
  try {
    const contentTalker = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentTalker);
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
};

module.exports = {
  readTalker,
};
