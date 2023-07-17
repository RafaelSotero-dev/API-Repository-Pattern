# API-Repository-Pattern

Bem-vindo ao repositório do projeto API-Repository-Pattern! Este projeto é uma API básica que implementa o padrão de repositório em uma aplicação web. O padrão de repositório é uma forma organizada de separar a lógica de acesso a dados do restante da aplicação.
## Requisitos

- Node.js (v14.x ou superior)
- NPM (ou Yarn)
- TypeScript
- MongoDB
## Instalação

Siga os passos abaixo para configurar o ambiente e executar o projeto em sua máquina:

```bash
$ git clone https://github.com/RafaelSotero-dev/API-Repository-Pattern.git
$ cd API-Repository-Pattern
$ npm install # ou yarn install
$ cp .env.example .env # Configure as variáveis de ambiente de acordo com sua instância do MongoDB e uma secretkey para a criação do token jwt
$ npm run dev # ou yarn dev
```
**Endpoints:**
```markdown
O projeto oferece os seguintes endpoints:

- **GET** /users - Retorna todos os usuários cadastrados
- **POST** /users - Cria um novo usuário
- **PUT** /users/:id - Atualiza os dados de um usuário existente
- **DELETE** /users/:id - Remove um usuário com base no ID fornecido
```
## Contribuição

Contribuições são bem-vindas! Se você deseja colaborar com este projeto, siga os passos abaixo:

```bash
$ git clone https://github.com/RafaelSotero-dev/API-Repository-Pattern.git
$ cd API-Repository-Pattern
$ npm install # ou yarn install
$ git checkout -b minha-branch-de-contribuicao
```
## Faça suas alterações e adições

```bash

$ git add .
$ git commit -m "Minha contribuição: descrição das alterações"
$ git push origin minha-branch-de-contribuicao
```

**Licença:**
```markdown
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter mais detalhes.
```
## Contato

Se você tiver alguma dúvida ou quiser entrar em contato, sinta-se à vontade para enviar um e-mail para rafaeljesusabc2@gmail.com.
