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

const writeTalker = async (allTalkers) => {
  await fs.writeFile(join(__dirname, path), allTalkers);
};

module.exports = {
  readTalker,
  writeTalker,
};
