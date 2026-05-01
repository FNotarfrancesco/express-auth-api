import express from 'express'
import 'dotenv/config'
import { globalLimiter } from './middlewares/rate-limit.middleware.js'
import dbConnection from './utils/db-connection.js'
import routerUsuarios from './routers/usuarios.routers.js'
import routerProductosApi from './routers/productos.api.routers.js'
import helmet from 'helmet'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import * as passportStragegy from './utils/handle-passport.js'
import cors from 'cors'
import errorHandler from './middlewares/error-handler.middleware.js'
import mongoSanitize from 'express-mongo-sanitize'


const app = express()
const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.MONGO_URL
const SESSION_SECRET = process.env.SESSION_SECRET

if (!MONGO_URL || !SESSION_SECRET) {
  throw new Error('Faltan variables de entorno requeridas')
}

app.use(helmet())
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}))

// Solo aplicamos el limitador si estamos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(globalLimiter)
}

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true, // Cambiar a true
  store: null,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'none'
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routerUsuarios)
app.use('/', routerProductosApi)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Aplicación funcionando: http://localhost:${PORT}`)
  dbConnection(MONGO_URL)
})