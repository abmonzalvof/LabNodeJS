import express from 'express'
import helmet from 'helmet'  //Package, This support us to add common headers into an application
import cors from 'cors'
import mongoose from 'mongoose'
import categories from './routes/categories' 
import posts from './routes/posts' 
import auth from './routes/auth' 
import verifyToken from './middleware/auth' 
import errorHandler from './middleware/errorHandle'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors({
   origin: ['http://localhost:4200']
}))
app.use('/api/auth', auth)
app.use(verifyToken)
app.use('/api/categories', categories)
app.use('/api/posts', posts)
app.use(errorHandler)
mongoose.connect(process.env.MONGO_URL).then( () =>{
  console.log('Connected to MongoDB')
  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`)
  })
}).catch((e) => {
  console.log(e)
})



