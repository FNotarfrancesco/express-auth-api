import express from 'express'
import usuariosController from '../controllers/usuarios.controller.js'
import { loginLimiter } from '../middlewares/rate-limit.middleware.js'
import { validateBody } from '../middlewares/validate.middleware.js'
import { registerSchema } from '../validators/auth.validator.js'

const routerUsuarios = express.Router()

routerUsuarios.post('/api/auth/register', validateBody(registerSchema), usuariosController.register)
routerUsuarios.post('/api/auth/login', loginLimiter, usuariosController.loginApi)
routerUsuarios.get('/api/auth/logout', usuariosController.logout)

export default routerUsuarios