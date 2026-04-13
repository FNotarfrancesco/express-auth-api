import modelosProducto from '../models/productos.models.js'

// ===============================
// CRUD API JSON
// ===============================

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

// ===============================
// EXPORT
// ===============================

export default {
  getAllJson,
  getOneJson,
  createJson,
  updateJson,
  removeJson
}