import mongoose from 'mongoose'

// https://npmjs.com/package/dotenv
// console.log(process.env) // ! <<<---- Variables de entorno
//console.log(process.env.MONGO_LOCAL)
//const stringConnectionLocal = process.env.MONGO_LOCAL
//const stringConnectionRemoto = process.env.MONGO_REMOTO

// ! 1. Conexión a la base de datos
const dbConnection = async (URI) => {
    try {
        //const resultadoDeConection = await mongoose.connect(stringConnectionRemoto)
        //console.log(resultadoDeConection)
        await mongoose.connect(URI)
        console.log('DB Conectada')
    } catch (error) {
        console.log('No se pudo efectuar la conexión', error)
    }
}

export default dbConnection