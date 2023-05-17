// Requisitos 1 ao 8 foram baseados nos exercicios da seção nos dias 4 (Exercicios - agora, a prática 1 e 2) e 2 (Exercicios - agora, a prática - Movies - 4, 5, 6, 7, 8, 9 e 10);
const express = require('express');
const validateAge = require('./middlewares/validateAge');
const validateAuthorization = require('./middlewares/validateAuthorization');
const validateEmail = require('./middlewares/validateEmail');
const validateName = require('./middlewares/validateName');
const validatePassword = require('./middlewares/validatePassword');
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

app.get('/talker/search', validateAuthorization, async (req, res) => {
  const { q } = req.query;
  const talkers = await talkerUtils.readTalker();

  if (q) {
    const filteredTalkers = talkers.filter((obj) => obj.name.includes(q));
    return res.status(HTTP_OK_STATUS).json(filteredTalkers);
  }
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  return res.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker', async (req, res) => {
    const talkers = await talkerUtils.readTalker();
    return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
    const talkers = await talkerUtils.readTalker();
    const talker = talkers.find((obj) => obj.id === Number(req.params.id));

    if (talker) {
      return res.status(HTTP_OK_STATUS).json(talker);
    }
    
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).json({ token });
  }
});

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

app.delete('/talker/:id', validateAuthorization, async (req, res) => {
    const { id } = req.params;
    const talkers = await talkerUtils.readTalker();
    const filteredTalkers = talkers.filter((obj) => obj.id !== Number(id));

    const updatedTalkers = JSON.stringify(filteredTalkers);
    await talkerUtils.writeTalker(updatedTalkers);

    return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
