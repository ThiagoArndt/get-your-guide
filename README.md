# Integrantes

Thiago Arndt, Henrique, Gustavo William, Luis Felipe, Lucas dos Santos Michles

# Como rodar

Para rodar o projeto, entre na branch de dev, depois, gere um .env
contendo os seguites dados:

.env:

```env
DATABASE_URL="mongodb+srv://thiago_040404:CzESGeSUnd5vUMOP@cluster0.sm06n60.mongodb.net/getyourguidedb?retryWrites=true&w=majority&appName=Cluster0"
NODE_ENV="development"
SECRET="mysupersecretkey"
```

<b> Observação: Para que o professor possa rodar, estou colocando as informações do .env aqui, apesar de não ser uma prática recomendada.

Feito isso, você pode rodar os seguintes comandos:

```bash
# Node Version: 20.11.0
npm install

npm run dev
```

Agora, é só acessar http://localhost:3000
