import express from 'express'
import controladoresProductos from '../controllers/productos.controller.js'
import isAuthenticated from '../middlewares/usuarios.middleware.js'

const routerProductosApi = express.Router()

routerProductosApi.get('/api/v1/productos/export', isAuthenticated, controladoresProductos.exportarProductosCSV)
routerProductosApi.get('/api/v1/productos', isAuthenticated, controladoresProductos.getAllJson)
routerProductosApi.get('/api/v1/productos/:id', isAuthenticated, controladoresProductos.getOneJson)
routerProductosApi.post('/api/v1/productos', isAuthenticated, controladoresProductos.createJson)
routerProductosApi.put('/api/v1/productos/:id', isAuthenticated, controladoresProductos.updateJson)
routerProductosApi.delete('/api/v1/productos/:id', isAuthenticated, controladoresProductos.removeJson)

export default routerProductosApi