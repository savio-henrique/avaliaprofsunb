# Sistema de Gerenciamento de Avaliações

## Para rodar na sua máquina você precisa ter o `Node` instalado, o `npm` ou o `yarn`, e o Docker e Docker-Compose

### Instruções iniciais

***Certifique-se de que a rede 172.20.0.0/24, em seu docker, esteja disponível para o funcionamento dos contêineres.***

Após clonar o repositório, execute o seguinte comando em seu terminal:

```bash
docker-compose build
```

Em seguida execute:

```bash
docker-compose up -d
```

Abra seu navegador e acesse ```172.20.0.4:3000``` ou então ```localhost:3000``` e então a aplicação deve abrir em seu computador!!
