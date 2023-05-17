// exemplo da função para gerar token pego da Sec4 > dia 04 > exercicio 2.2
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;