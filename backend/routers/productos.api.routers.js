import express from 'express'
import controladoresProductos from '../controllers/productos.controller.js'
import authJWT from '../middlewares/auth.middleware.js'

const routerProductosApi = express.Router()

routerProductosApi.get('/api/v1/productos/export', authJWT, controladoresProductos.exportarProductosCSV)
routerProductosApi.get('/api/v1/productos', authJWT, controladoresProductos.getAllJson)
routerProductosApi.get('/api/v1/productos/:id', authJWT, controladoresProductos.getOneJson)
routerProductosApi.post('/api/v1/productos', authJWT, controladoresProductos.createJson)
routerProductosApi.put('/api/v1/productos/:id', authJWT, controladoresProductos.updateJson)
routerProductosApi.delete('/api/v1/productos/:id', authJWT, controladoresProductos.removeJson)

export default routerProductosApi