import mongoose from 'mongoose'

const dbConnection = async (URI) => {
    try {
        await mongoose.connect(URI)
        console.log('DB Conectada')
        return true
    } catch (error) {
        console.log('No se pudo efectuar la conexión', error)
        return false
    }
}

export default dbConnection