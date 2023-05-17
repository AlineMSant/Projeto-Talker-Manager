const express = require('express');

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

app.listen(PORT, () => {
  console.log('Online');
});