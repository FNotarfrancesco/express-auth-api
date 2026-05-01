import usuarioModelos from '../models/usuarios.models.js'
import dotenv from 'dotenv'
import { generateToken } from '../utils/jwt.utils.js'
dotenv.config()

// ===============================
// REGISTER
// ===============================

const register = async (req, res) => {
  const nuevoUsuario = req.body
  const { name, email, password, confirm_password, code } = nuevoUsuario
  const errors = []

  if (code !== process.env.REGISTRATION_CODE) {
    errors.push('Código de registro inválido')
  }

  if (password !== confirm_password) {
    errors.push('La contraseña no coincide')
  }

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  const usuarioEncontrado = await usuarioModelos.obtenerUsuarioPorEmail(email)
  if (usuarioEncontrado) {
    return res.status(400).json({ errors: ['El usuario ya existe'] })
  }

  try {
    await usuarioModelos.crearUsuario(nuevoUsuario)
    res.json({ message: 'Usuario creado correctamente', success: true })
  } catch (error) {
    res.status(500).json({ errors: ['Error al crear usuario'] })
  }
}

// ===============================
// LOGIN
// ===============================

const loginApi = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ errors: ['Email y contraseña requeridos'] })
  }

  const usuario = await usuarioModelos.obtenerUsuarioPorEmail(email)
  if (!usuario) {
    return res.status(401).json({ errors: ['Credenciales inválidas'] })
  }

  const passwordCorrecto = await usuarioModelos.revisarPassword(usuario, password)
  if (!passwordCorrecto) {
    return res.status(401).json({ errors: ['Credenciales inválidas'] })
  }

  const token = generateToken(usuario)
  res.json({
    message: 'Login exitoso',
    token,
    user: { id: usuario._id, name: usuario.name, email: usuario.email, rol: usuario.rol }
  })
}

// ===============================
// GET ALL USERS (admin)
// ===============================

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModelos.obtenerTodosLosUsuarios()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ errors: ['Error al obtener usuarios'] })
  }
}

// ===============================
// UPDATE USER ROLE (admin)
// ===============================

const actualizarRolUsuario = async (req, res) => {
  const { id } = req.params
  const { rol } = req.body

  const rolesValidos = ['admin', 'editor', 'viewer']
  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ errors: ['Rol inválido'] })
  }

  try {
    const usuario = await usuarioModelos.actualizarRolUsuario(id, rol)
    if (!usuario) {
      return res.status(404).json({ errors: ['Usuario no encontrado'] })
    }
    res.json({ message: 'Rol actualizado', user: usuario })
  } catch (error) {
    res.status(500).json({ errors: ['Error al actualizar rol'] })
  }
}

// ===============================
// DELETE USER (admin)
// ===============================

const eliminarUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const usuario = await usuarioModelos.eliminarUsuario(id)
    if (!usuario) {
      return res.status(404).json({ errors: ['Usuario no encontrado'] })
    }
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ errors: ['Error al eliminar usuario'] })
  }
}

// ===============================
// EXPORT
// ===============================

export default {
  register,
  loginApi,
  obtenerTodosLosUsuarios,
  actualizarRolUsuario,
  eliminarUsuario
}
