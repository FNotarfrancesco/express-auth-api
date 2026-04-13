import mongoose from "mongoose"
import productosEsquema from "./schemas/productos.schemas.js"


// ! 2.2 Creo el MODELO a partir del ESQUEMA
const ProductosModelo = mongoose.model('productos', productosEsquema)

const obtenerTodos = async () => {

    try {
        // 1. Obtener los productos de la DB
        // Le tengo que poner a la consulta el método lean() que lo hace es convertir el obj de mongoose en un objeto de js
        const todosLosProductos = await ProductosModelo.find().lean()
        // 2. Retornarlos para que los reciba el controlador
        return todosLosProductos
        
    } catch (error) {
        
    }

}
const obtenerUnProductoPorId = async (id) => {

    try {
        // El findById -> Devuelve un objeto de mongoose -> lean() -> obj de JS
        const unProducto = await ProductosModelo.findById(id).lean()
        return unProducto     
    } catch (error) {
        
    }

}
const saveProducto = async (producto) => {

    // 1. Guardarlo en la DB
    const productoGuardado = await ProductosModelo.create(producto)
    // 2. Retonarlo para que lo reciba el controlador
    return productoGuardado
}

const updateProducto = async (id, productoPorEditar) => {

    try {
        const options = { new: true}
        const productoActualizado = await ProductosModelo.findByIdAndUpdate(id, productoPorEditar, options)
        return productoActualizado
    } catch (error) {
        
    }

}


const removeProducto = async (id) => {

    try {
        const productoEliminado = await ProductosModelo.findByIdAndDelete(id)
        return productoEliminado
    } catch (error) {
        
    }
}

export default {
    obtenerTodos,
    obtenerUnProductoPorId,
    saveProducto,
    updateProducto,
    removeProducto
}