import express from 'express'
import controladoresProductos from '../controllers/productos.controller.js'
import isAuthenticated from '../middlewares/usuarios.middleware.js'

const routerProductosApi = express.Router()

// GET all productos
routerProductosApi.get('/api/v1/productos', isAuthenticated, controladoresProductos.getAllJson)

// GET one producto
routerProductosApi.get('/api/v1/productos/:id', isAuthenticated, controladoresProductos.getOneJson)

// POST create producto
routerProductosApi.post('/api/v1/productos', isAuthenticated, controladoresProductos.createJson)

// PUT update producto
routerProductosApi.put('/api/v1/productos/:id', isAuthenticated, controladoresProductos.updateJson)

// DELETE remove producto
routerProductosApi.delete('/api/v1/productos/:id', isAuthenticated, controladoresProductos.removeJson)

export default routerProductosApi