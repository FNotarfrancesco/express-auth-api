import express from 'express'
import usuariosController from '../controllers/usuarios.controller.js'
import { loginLimiter } from '../middlewares/rate-limit.middleware.js'
import { validateBody } from '../middlewares/validate.middleware.js'
import { registerSchema } from '../validators/auth.validator.js'

const routerUsuarios = express.Router()

routerUsuarios.post('/api/auth/register', validateBody(registerSchema), usuariosController.register)
routerUsuarios.post('/api/auth/login', loginLimiter, usuariosController.loginApi)
routerUsuarios.get('/api/auth/logout', usuariosController.logout)
routerUsuarios.get('/api/auth/users', usuariosController.obtenerTodosLosUsuarios)
routerUsuarios.put('/api/auth/users/:id/rol', usuariosController.actualizarRolUsuario)
routerUsuarios.delete('/api/auth/users/:id', usuariosController.eliminarUsuario)

export default routerUsuarios