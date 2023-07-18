# Sistema de Gerenciamento de Avaliações

### Para rodar na sua máquina você precisa ter o `Node` instalado, o `npm` ou o `yarn`, e o Docker e Docker-Compose.

### Instruções iniciais

Após clonar o repositório, via interface de comando entrar na pasta `app-bd/frontend` e instalar suas dependências.

```
cd app-bd/frontend
yarn
// ou npm install
```

Após isso, vai entrar na pasta `app-bd/backend` e fazer o mesmo.

```
cd ../backend
yarn
// ou npm install
```

Somente então deve iniciar o Container do Banco de Dados.

```
cd ../../
docker-compose up -d
```

Logo após deve entrar no terminal do mysql do container.

```
docker exec -it avaliaprofsunb_db_1 mysql -p
// senha: bd

use projeto_bd;

source /var/lib/mysql-files/create_db.sql;
\q
```

Após isso, deve se iniciar os servidores de front e de backend:

```
cd app-bd/frontend
yarn start
```

e

```
cd app-bd/backend
yarn dev
```

A aplicação deve abrir em seu computador!!