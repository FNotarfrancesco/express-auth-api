import mongoose from "mongoose"
import productosEsquema from "./schemas/productos.schemas.js"

const ProductoModelo = mongoose.model('productos', productosEsquema)

const obtenerTodos = async () => {
  try {
    return await ProductoModelo.find().lean()
  } catch (error) {
    console.log('[obtenerTodos]', error)
  }
}

const obtenerUnProductoPorId = async (id) => {
  try {
    return await ProductoModelo.findById(id).lean()
  } catch (error) {
    console.log('[obtenerUnProductoPorId]', error)
  }
}

const saveProducto = async (producto) => {
  try {
    return await ProductoModelo.create(producto)
  } catch (error) {
    console.log('[saveProducto]', error)
  }
}

const updateProducto = async (id, producto) => {
  try {
    return await ProductoModelo.findByIdAndUpdate(id, producto, { new: true })
  } catch (error) {
    console.log('[updateProducto]', error)
  }
}

const removeProducto = async (id) => {
  try {
    return await ProductoModelo.findByIdAndDelete(id)
  } catch (error) {
    console.log('[removeProducto]', error)
  }
}

export default {
  obtenerTodos,
  obtenerUnProductoPorId,
  saveProducto,
  updateProducto,
  removeProducto
}