# Integrantes

Thiago Arndt, Henrique, Gustavo William, Luis Felipe, Lucas dos Santos Michles

# Como rodar

Crie um banco de dados mongodb e coloque sua string de conexão em "DATABASE_URL"

.env:

```env
DATABASE_URL="mongodb+srv://xxxxxxxx:xxxxx@cluster0.sm06n60.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0"
NODE_ENV="development"
SECRET="mysupersecretkey"
GOOGLE_API_KEY="https://maps.googleapis.com/maps/api/js?key=xxxxxxxxxxxxx&libraries=places"
```

Agora, você precisa enviar nosso schema do prisma para o banco de dados:

```
npx prisma db push
npx prisma generate
```

OBS: Talvez seja necessário utilizar --force

Feito isso, você pode rodar os seguintes comandos:

```bash
# Node Version: 20.11.0
npm install

npm run dev
```

Agora, é só acessar http://localhost:3000
