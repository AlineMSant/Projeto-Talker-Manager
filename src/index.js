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

app.get('/talker', async (req, res) => {
    const talkers = await talkerUtils.readTalker();
    return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
    const talkers = await talkerUtils.readTalker();
    const talker = talkers.find((obj) => obj.id === Number(req.params.id));

    if (talker) {
      return res.status(200).json(talker);
    }
    
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
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

app.listen(PORT, () => {
  console.log('Online');
});
