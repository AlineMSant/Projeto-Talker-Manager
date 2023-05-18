const talkerUtils = require('../utils/talkerUtils');

const verifyQ = async (req, res, next) => {
  const { q, rate } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (q && !rate) {
    const filteredTalkers = talkers.filter((obj) => obj.name.includes(q));
    return res.status(200).json(filteredTalkers);
  }

  next();
};

const verifyNone = async (req, res, next) => {
  const { q, rate } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (!q && !rate) {
    return res.status(200).json(talkers);
  }
  if (q === undefined && !rate) {
    return res.status(200).json([]);
  }

  next();
};

const verifyRateIsNumber = async (req, res, next) => {
  const { rate } = req.query;
  const rateNumber = Number(rate);

  if (!Number.isInteger(rateNumber) || Number(rate) <= 0 || Number(rate) > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const verifyRate = async (req, res, next) => {
  const { q, rate } = req.query;
  const talkers = await talkerUtils.readTalker();
  const rateNumber = Number(rate);

  if (rate && !q) {
    const filteredTalkers = talkers.filter((obj) => obj.talk.rate === rateNumber);
    return res.status(200).json(filteredTalkers);
  }

  next();
};

module.exports = {
  verifyQ,
  verifyNone,
  verifyRateIsNumber,
  verifyRate,
};