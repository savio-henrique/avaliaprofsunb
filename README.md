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
docker exec -it 
```