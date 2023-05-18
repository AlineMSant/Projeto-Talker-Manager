const talkerUtils = require('../utils/talkerUtils');

const verifyQ = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (q && !rate && !date) {
    const filteredTalkers = talkers.filter((obj) => obj.name.includes(q));
    return res.status(200).json(filteredTalkers);
  }

  next();
};

const verifyNone = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (!q && !rate && !date) {
    return res.status(200).json(talkers);
  }

  next();
};

const verifyUndDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (!q && !rate && date === undefined) {
    return res.status(200).json(talkers);
  }

  next();
};

const verifyUndQ = async (req, res, next) => {
  const { q, rate, date } = req.query;

  if (q === undefined && !rate && !date) {
    return res.status(200).json([]);
  }

  next();
};

const verifyRateIsNumber = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const rateNumber = Number(rate);

  if (!q && !date && !Number.isInteger(rateNumber)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const verifyRateIsLessThanOne = async (req, res, next) => {
  const { q, rate, date } = req.query;

  if (!q && !date && Number(rate) <= 0) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const verifyRateIsMoreThenFive = async (req, res, next) => {
  const { q, rate, date } = req.query;

  if (!q && !date && Number(rate) > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const verifyRate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();
  const rateNumber = Number(rate);

  if (rate && !q && !date) {
    const filteredTalkers = talkers.filter((obj) => obj.talk.rate === rateNumber);
    return res.status(200).json(filteredTalkers);
  }

  next();
};

const verifyDateIsDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const validateDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!q && !rate && !validateDate.test(date)) {
    return res.status(400)
    .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' }); 
  }

  next();
};

const verifyDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (date && !rate && !q) {
    const filteredTalkersDate = talkers.filter((obj) => obj.talk.watchedAt === date);
    return res.status(200).json(filteredTalkersDate);
  }

  next();
};

const verifyRateAndQ = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();
  const rateNumber = Number(rate);

  if (rate && q && !date) {
    const filteredTalkers = talkers
    .filter((obj) => obj.talk.rate === rateNumber && obj.name.includes(q));
    return res.status(200).json(filteredTalkers);
  }

  next();
};

const verifyQAndDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (!rate && q && date) {
    const filteredTalkers = talkers
    .filter((obj) => obj.talk.watchedAt === date && obj.name.includes(q));
    return res.status(200).json(filteredTalkers);
  }

  next();
};

const verifyRateAndDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();
  const rateNumber = Number(rate);

  if (rate && !q && date) {
    const filteredTalkers = talkers
    .filter((obj) => obj.talk.watchedAt === date && obj.talk.rate === rateNumber);
    return res.status(200).json(filteredTalkers);
  }

  next();
};

module.exports = {
  verifyQ,
  verifyNone,
  verifyUndDate,
  verifyUndQ,
  verifyRateIsNumber,
  verifyRateIsLessThanOne,
  verifyRateIsMoreThenFive,
  verifyRate,
  verifyDateIsDate,
  verifyDate,
  verifyRateAndQ,
  verifyQAndDate,
  verifyRateAndDate,
};