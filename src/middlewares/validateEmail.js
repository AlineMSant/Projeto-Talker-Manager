module.exports = (req, res, next) => {
  const { email } = req.body;
  //https://horadecodar.com.br/como-validar-email-com-javascript//
  const reEmail = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'O campo \"email\" é obrigatório' });
  }
  if (!reEmail.test(email)) {
    return res.status(400).json({ message: 'O \"email\" deve ter o formato \"email@email.com\"' });
  }

  next();
}