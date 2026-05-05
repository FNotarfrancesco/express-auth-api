import mongoose from 'mongoose'
import 'dotenv/config'
import './models/usuarios.models.js'
import './models/productos.models.js'
import bcrypt from 'bcrypt'
import usuarioModelos from './models/usuarios.models.js'

const seedDemoData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('[Seed] Conectado a MongoDB')

    // --- Limpiar colecciones ---
    const Usuario = mongoose.model('usuarios')
    const Producto = mongoose.model('productos')
    await Usuario.deleteMany({})
    await Producto.deleteMany({})
    console.log('[Seed] Colecciones limpiadas')

    // --- Crear usuarios demo ---
    const demoUsers = [
      { name: 'Admin', email: 'admin@example.com', password: 'admin123+', rol: 'admin' },
      { name: 'Editor', email: 'editor@example.com', password: 'editor123+', rol: 'editor' },
      { name: 'Viewer', email: 'viewer@example.com', password: 'viewer123+', rol: 'viewer' }
    ]

    for (const user of demoUsers) {
      await usuarioModelos.crearUsuario(user)
      console.log(`[Seed] Usuario demo creado: ${user.email}`)
    }

    // --- Crear productos demo ---
    const demoProducts = [
      { nombre: 'Asus Zenbook a14', categoria: 'Notebooks', disponible: true, stock: 5, precio: 1500000 },
      { nombre: 'AMD Ryzen 5 3400G', categoria: 'Procesadores', disponible: true, stock: 4, precio: 107150 },
      { nombre: 'Corsair 850W Cybenetics Gold RM850e Full Modular ATX 3.1 PCIe 5.1', categoria: 'Fuentes de alimentación', disponible: true, stock: 2, precio: 181650 },
      { nombre: 'Corsair HS80 Premium SlipStream Wireless 2.4Ghz Dolby Atmos Black RGB 20Hs', categoria: 'Auriculares', disponible: true, stock: 2, precio: 253990 },
      { nombre: 'XFX Radeon RX 9070 XT 16GB GDDR6 Swift Triple Fan Gaming Edition', descripcion: 'DIMENSIONES\n-Ancho de la placa: 150 mm\n-Espesor de la placa: 3.5 slots\n-Largo de la placa: 330 mm', categoria: 'Placas de Video', disponible: true, stock: 2, precio: 1187250 },
      { nombre: 'Fuente Thermaltake Smart BX1 650W RGB 80 Plus Bronze', descripcion: 'Formato\nATX\n\nWatts nominal\n650 w\n\nWatts reales\n576 w\n\nCompatible con posición inferior\nSi\n\nCertificación\n80 PLUS Bronze\n\nTipo de cableado\nCables fijos\n\nModo híbrido\nNo\n\nAmpers en linea +12v\n48 a\n\nFuente digital\nNo\n\nColor\nNegro\n\nIluminación\nRGB', categoria: 'Fuentes de alimentación', disponible: false, stock: 0, precio: 75600 },
      { nombre: 'Monitor Gamer ASUS VY229HF-J 22" FHD IPS 100Hz', descripcion: 'Tipo de iluminación: LED\nTipo de panel: IPS', categoria: 'Monitores', disponible: false, stock: 0, precio: 153380 },
      { nombre: 'Corsair Virtuoso MAX Wireless 2.4Ghz Bluetooth Premium Dolby Atmos Black USB-C 60Hs', descripcion: '', categoria: 'Auriculares', disponible: true, stock: 1, precio: 666990 },
      { nombre: 'Logitech G733 Wireless Lightspeed LightSync RGB Black 29Hs', categoria: 'Auriculares', disponible: true, stock: 5, precio: 259990 }
    ]
    await Producto.insertMany(demoProducts)
    console.log('[Seed] 9 productos demo creados')

    await mongoose.disconnect()
    console.log('[Seed] Completado - App lista para demo')
  } catch (error) {
    console.error('[Seed] Error:', error.message)
    process.exit(1)
  }
}

export default seedDemoData
