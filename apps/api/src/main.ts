import express from 'express'
import helmet from 'helmet'  //Package, This support us to add common headers into an application
import cors from 'cors'
import categories from './routes/categories' 
import posts from './routes/posts' 

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors({
   origin: ['http://localhost:4200']
}))
app.use('/api/categories', categories)
app.use('/api/posts', posts)
app.listen(port, host, () => {

  console.log(`[ ready ] http://${host}:${port}`)
})
