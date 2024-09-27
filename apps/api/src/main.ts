import express from 'express';

import helmet from 'helmet';  //Package, This support us to add common headers into an application

import cors from 'cors';



const host = process.env.HOST ?? 'localhost';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;



const app = express();



app.use(express.json());

app.use(helmet());

app.use(cors({

   origin: ['http://localhost:4200']

}));



app.get('/', (req, res) => {

  // const {username, pass} = req.body;

  // console.log(username,pass)

  res.send({ message: 'Hello MFEE!' });

});



app.listen(port, host, () => {

  console.log(`[ ready ] http://${host}:${port}`);

});

