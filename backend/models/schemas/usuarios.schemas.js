import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const usuariosEsquema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true
        },
        rol: {
            type: String,
            enum: ['admin', 'editor', 'viewer'],
            default: 'viewer',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Métodos de los esquemas (Métodos de mongoose)
//                                                 123456
usuariosEsquema.methods.encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) // la semilla () 
    return await bcrypt.hash(password, salt) // me retorna el password encriptado (hasheado)
}

// -> encriptación -> bidireccional -> 2 vías -> 123456 -> afdasfasdf1213214fdsa -> 123456
// -> encriptación -> unidirecional -> 1 vía -> 123456 -> afdasfasdf1213214fdsa -> No puedo volver atrás

// No puedo descriptar el password almacenado en DB. Lo que va hacer es encriptar el password que llega del formuarlio de logueo y lo compararo con el paswsword encriptado en la DB.
// bcrypt se loc conoce como un función hash de una sola vía. Lo encriptado por brcypt no se puede volver a descriptar

usuariosEsquema.methods.comprobarPassword = async function(password) {
    // ----------------> compare(password-form-logueo, password-db-encriptado)
    return await bcrypt.compare(password, this.password) // true o false
}


export default usuariosEsquema