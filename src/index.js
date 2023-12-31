// Requisitos 1 ao 8 foram baseados nos exercicios da seção nos dias 4 (Exercicios - agora, a prática 1 e 2) e 2 (Exercicios - agora, a prática - Movies - 4, 5, 6, 7, 8, 9 e 10);
const express = require('express');
const validateAge = require('./middlewares/validateAge');
const validateAuthorization = require('./middlewares/validateAuthorization');
const validateEmail = require('./middlewares/validateEmail');
const validateName = require('./middlewares/validateName');
const validateOnlyRate = require('./middlewares/validateOnlyRate');
const validatePassword = require('./middlewares/validatePassword');
const { verifyQ,
  verifyRate,
  verifyNone,
  verifyUndDate,
  verifyUndQ,
  verifyRateIsNumber,
  verifyRateIsLessThanOne,
  verifyRateIsMoreThenFive,
  verifyDateIsDate,
  verifyDate,
  verifyRateAndQ,
  verifyQAndDate,
  verifyRateAndDate } = require('./middlewares/verifySearch');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const generateToken = require('./utils/generateToken');

const talkerUtils = require('./utils/talkerUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// req 8-9-10
app.get('/talker/search',
validateAuthorization,
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
verifyRateAndDate, async (req, res) => {
  const { q, rate, date } = req.query;
  const talkers = await talkerUtils.readTalker();
  const rateNumber = Number(rate);

  if (rate && q && date) {
    const filteredTalkers = talkers
    .filter((obj) => obj.talk.watchedAt === date
    && obj.talk.rate === rateNumber && obj.name.includes(q));
    return res.status(200).json(filteredTalkers);
  }
});

// req 1
app.get('/talker', async (req, res) => {
    const talkers = await talkerUtils.readTalker();
    return res.status(HTTP_OK_STATUS).json(talkers);
});

// req 2
app.get('/talker/:id', async (req, res) => {
    const talkers = await talkerUtils.readTalker();
    const talker = talkers.find((obj) => obj.id === Number(req.params.id));

    if (talker) {
      return res.status(HTTP_OK_STATUS).json(talker);
    }
    
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

// req 3
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).json({ token });
  }
});

// req 5
app.post('/talker',
validateAuthorization,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await talkerUtils.readTalker();

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };

  const allTalkers = JSON.stringify([...talkers, newTalker]);
  await talkerUtils.writeTalker(allTalkers);

  return res.status(201).json(newTalker);
});

// req 6
app.put('/talker/:id',
validateAuthorization,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await talkerUtils.readTalker();
    const talker = talkers.find((obj) => obj.id === Number(req.params.id));
  
    if (talker) {
      const index = talkers.findIndex((obj) => obj.id === Number(id));
  
      talkers[index] = { id: Number(id), name, age, talk };
    
      const updatedTalkers = JSON.stringify(talkers);
      await talkerUtils.writeTalker(updatedTalkers);
  
      return res.status(HTTP_OK_STATUS).json({ id: Number(id), name, age, talk });
    }

    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

// req 7
app.delete('/talker/:id', validateAuthorization, async (req, res) => {
    const { id } = req.params;
    const talkers = await talkerUtils.readTalker();
    const filteredTalkers = talkers.filter((obj) => obj.id !== Number(id));

    const updatedTalkers = JSON.stringify(filteredTalkers);
    await talkerUtils.writeTalker(updatedTalkers);

    return res.status(204).end();
});

// req 11
app.patch('/talker/rate/:id',
validateAuthorization, validateOnlyRate, async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    const talkers = await talkerUtils.readTalker();
    const talker = talkers.find((obj) => obj.id === Number(req.params.id));
    const index = talkers.findIndex((obj) => obj.id === Number(id));
    const newTalker = {
      id: Number(id),
      name: talker.name,
      age: talker.age,
      talk: {
        watchedAt: talker.talk.watchedAt,
        rate,
      },
    };
    talkers[index] = newTalker;
    const updatedTalkers = JSON.stringify(talkers);
    await talkerUtils.writeTalker(updatedTalkers);
    return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
