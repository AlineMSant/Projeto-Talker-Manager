# Talker Manager

## Descrição
Uma aplicação de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações.

## Início rápido com Docker
```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev

# em outro terminal, rode os testes
docker exec -it talker_manager bash
npm run lint # roda a verificação do linter
npm test # roda todos os testes
npm test 01 # rodando apenas o teste do requisito 01
```

## Habilidades desenvolvidas:
- Desenvolver uma API de um CRUD (Create, Read, Update e Delete) de palestrantes (talkers) e;
- Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo fs.

## Opcionais
Você pode usar o comando "npm run restore" para restaurar o arquivo src/talker.json para seu estado inicial.


## Formas de contato:
Email: alinems4120@gmail.com <br>
Linkedin: <a href="https://www.linkedin.com/in/alinemourasantos-dev/" target="_blank">Clique aqui</a>
