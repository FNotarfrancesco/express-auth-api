import passport from 'passport'
import usuarioModelos from '../models/usuarios.models.js'
import dotenv from 'dotenv'
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

  if (password.length < 5) {
    errors.push('La contraseña debe tener al menos 5 caracteres')
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

const loginApi = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ errors: ['Error del servidor'] })
    if (!user) return res.status(401).json({ errors: [info?.message || 'Credenciales inválidas'] })
    
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ errors: ['Error al iniciar sesión'] })
      return res.json({ message: 'Login exitoso', user: { id: user._id, name: user.name, email: user.email } })
    })
  })(req, res, next)
}

// ===============================
// LOGOUT
// ===============================

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)
    req.session.destroy()
    res.json({ message: 'Sesión cerrada' })
  })
}

// ===============================
// EXPORT
// ===============================

export default {
  register,
  loginApi,
  logout
}