import mongoose from "mongoose"
import usuariosEsquema from "./schemas/usuarios.schemas.js"

// ! Creamos el modelo a partir del esquema

const UsuarioModelo = mongoose.model('usuarios', usuariosEsquema)

const crearUsuario = async ( nuevoUsuario ) => { // nuevoUsuario = { name, email, password }
    
    try {
        
        const usuarioCreado = new UsuarioModelo(nuevoUsuario) // password sin encriptar
        //console.log(usuarioCreado.password) // no encriptado
        usuarioCreado.password = await usuarioCreado.encriptarPassword(nuevoUsuario.password) // password encriptado
        //console.log(usuarioCreado.password) // encriptado
        await usuarioCreado.save() // Guardo el usuario dentro de la DB que ya tiene el password encriptado
        return usuarioCreado // retorno para recibirlo en el controlador
        
    } catch (error) {
        console.log('[creandoUsuario]: Error al crear un usuario', error)
    }

}

const obtenerUsuarioPorEmail = async (email) => {

    try {

        const usuarioEncontrado = await UsuarioModelo.findOne( { email })
        return usuarioEncontrado
        
    } catch (error) {
        console.log('[obtenerUsuarioPorEmail]', error)
    }

}

const revisarPassword = async ( usuario, password ) => {
    try {
        
        const isMatch = await usuario.comprobarPassword(password)

        return isMatch

    } catch (error) {
        console.log('[revisarpassword]', error)
    }
} 

const obtenerUsuarioPorId = async (id) => {

    try {

        const usuario = await UsuarioModelo.findById(id)
        return usuario

    } catch (error) {
        console.log('[obtenerUsuarioPorId]', error)
    }
}

const obtenerTodosLosUsuarios = async () => {
    try {
        const usuarios = await UsuarioModelo.find().select('-password')
        return usuarios
    } catch (error) {
        console.log('[obtenerTodosLosUsuarios]', error)
    }
}

const actualizarRolUsuario = async (id, nuevoRol) => {
    try {
        const usuario = await UsuarioModelo.findByIdAndUpdate(
            id,
            { rol: nuevoRol },
            { new: true }
        ).select('-password')
        return usuario
    } catch (error) {
        console.log('[actualizarRolUsuario]', error)
    }
}

const eliminarUsuario = async (id) => {
    try {
        const usuario = await UsuarioModelo.findByIdAndDelete(id)
        return usuario
    } catch (error) {
        console.log('[eliminarUsuario]', error)
    }
}

export default {
    crearUsuario,
    obtenerUsuarioPorEmail,
    obtenerUsuarioPorId,
    revisarPassword,
    obtenerTodosLosUsuarios,
    actualizarRolUsuario,
    eliminarUsuario
}