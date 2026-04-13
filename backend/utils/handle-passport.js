// https://www.passportjs.org/packages/passport-local/
import passport from "passport"
import usuarioModelos from '../models/usuarios.models.js'
import { Strategy } from "passport-local"

// primer argumento (field)
const fieldEstrategia = { usernameField: 'email' }

// segundo argumento (callback)
const comprobacionUsuario = async (email, password, done) => {

    try {
        const usuario = await usuarioModelos.obtenerUsuarioPorEmail(email)

        if (!usuario) {
            return done(null, false, {mensaje: 'Usuario no encontrado.'})
        }

        const passwordCorrecto = await usuarioModelos.revisarPassword(usuario, password)

        if( !passwordCorrecto ) {
            return done(null, false, { mensaje: 'No coincide el password' })
        }

        return done(null, usuario)
                
    } catch (error) {
        console.log('[comprobacionUsuario]:', error)
    }

}

// Strategy('{<field>}', callback)
const estrategiaLocal = new Strategy(fieldEstrategia, comprobacionUsuario)

/* --------------------------------------------- */

export default passport.use(estrategiaLocal)

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser( async ( id, done) => {
    const usuario = await usuarioModelos.obtenerUsuarioPorId(id)
    done(null, usuario)
})