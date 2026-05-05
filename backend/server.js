import express from 'express'
import 'dotenv/config'
import { globalLimiter } from './middlewares/rate-limit.middleware.js'
import dbConnection from './utils/db-connection.js'
import seedDemoData from './seed.js'
import routerUsuarios from './routers/usuarios.routers.js'
import routerProductosApi from './routers/productos.api.routers.js'
import helmet from 'helmet'
import cors from 'cors'
import errorHandler from './middlewares/error-handler.middleware.js'
import mongoSanitize from 'express-mongo-sanitize'


const app = express()
const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.MONGO_URL
const JWT_SECRET = process.env.JWT_SECRET

if (!MONGO_URL || !JWT_SECRET) {
  throw new Error('Faltan variables de entorno requeridas: MONGO_URL, JWT_SECRET')
}

app.use(helmet())
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
}))

// Solo aplicamos el limitador si estamos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(globalLimiter)
}

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

app.use('/', routerUsuarios)
app.use('/', routerProductosApi)

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Aplicación funcionando: http://localhost:${PORT}`)
  await dbConnection(MONGO_URL)
  await seedDemoData()
})