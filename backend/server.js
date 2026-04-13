import express from 'express'
import 'dotenv/config'
import { globalLimiter } from './middlewares/rate-limit.middleware.js'
import dbConnection from './utils/db-connection.js'
import routerProductos from './routers/productos.api.routers.js'
import routerUsuarios from './routers/usuarios.routers.js'
import helmet from 'helmet'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import * as passportStragegy from './utils/handle-passport.js' // Incorporo la estragia local al proyecto
import controladoresProductos from './controllers/productos.controller.js'
import cors from 'cors'
import errorHandler from './middlewares/error-handler.middleware.js'
import routerProductosApi from './routers/productos.api.routers.js'
import mongoSanitize from 'express-mongo-sanitize'


// ! Variables/Constantes
const app = express()
const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.MONGO_URL
const SESSION_SECRET = process.env.SESSION_SECRET

if (!MONGO_URL || !SESSION_SECRET) {
  throw new Error('Faltan variables de entorno requeridas')
}

// ! Middlewares
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:4200', // Cuando pongas Angular
  credentials: true
}))
app.use(globalLimiter)
app.use(express.static('./public'))
app.use(express.json()) // <--- Entienda cuando recibas un json
app.use(express.urlencoded({extended: true})) // <--- Entienda cuando reciba información a través de un formulario html
app.use(mongoSanitize())

// * express-session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }) // store -> No permite indicar donde se van a guardar las session.
}))

// * passport
app.use(passport.initialize())
app.use(passport.session())

// * error handler
app.use(errorHandler)

// ! RUTAS
app.use('/', routerUsuarios)
app.use('/', routerProductosApi)

// ! ARRANQUE
app.listen(PORT, () => {
  console.log(`Aplicación funcionando: http://localhost:${PORT}`)
  dbConnection(MONGO_URL)
})