import modelosProducto from '../models/productos.models.js'

const getAllJson = async (req, res) => {
  try {
    const productos = await modelosProducto.obtenerTodos()
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

const getOneJson = async (req, res) => {
  const { id } = req.params
  try {
    const producto = await modelosProducto.obtenerUnProductoPorId(id)
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' })
  }
}

const createJson = async (req, res) => {
  const producto = req.body
  try {
    const productoCreado = await modelosProducto.saveProducto(producto)
    res.status(201).json(productoCreado)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' })
  }
}

const updateJson = async (req, res) => {
  const { id } = req.params
  const producto = req.body
  try {
    const productoActualizado = await modelosProducto.updateProducto(id, producto)
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(productoActualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' })
  }
}

const removeJson = async (req, res) => {
  const { id } = req.params
  try {
    const productoEliminado = await modelosProducto.removeProducto(id)
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' })
  }
}

const exportarProductosCSV = async (req, res) => {
  try {
    const productos = await modelosProducto.obtenerTodos()
    
    if (!productos || productos.length === 0) {
      res.setHeader('Content-Type', 'application/octet-stream')
      res.setHeader('Content-Disposition', 'attachment; filename=productos.csv')
      return res.send('Nombre,Precio,Categoría,Stock,Disponible\n')
    }
    
    const csvHeader = 'Nombre,Precio,Categoría,Stock,Disponible\n'
    const csvRows = productos.map(p => 
      `${p.nombre},${p.precio},${p.categoria || ''},${p.stock},${p.disponible}`
    ).join('\n')
    
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'attachment; filename=productos.csv')
    res.send(csvHeader + csvRows)
  } catch (error) {
    res.status(500).json({ errors: ['Error al exportar'] })
  }
}

export default {
  getAllJson,
  getOneJson,
  createJson,
  updateJson,
  removeJson,
  exportarProductosCSV
}