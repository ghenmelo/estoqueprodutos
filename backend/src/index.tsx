import express from 'express';
import routes from './routes'
import cors from 'cors';

require('dotenv').config({  
  path: process.env.NODE_ENV === "prod" ? ".envProd" : ".env"
});

const app = express();
app.use(express.json())
app.use(cors());
app.use(routes)
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Servidor iniciado na porta' , PORT);
})