import mongoose from "mongoose"

// ! 2.1 Crear un ESQUEMA (SCHEMA)
const productosEsquema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        descripcion: String,
        categoria: String,
        disponible: Boolean,
        stock: Number,
        precio: Number
    },
    {
        versionKey: false, /* remover el field __v */
        timestamps: true /* createAt y el updateAt */
    }
)

// https://mongoosejs.com/docs/timestamps.html
// https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose

export default productosEsquema