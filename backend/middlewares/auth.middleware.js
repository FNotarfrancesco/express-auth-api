import { verifyToken } from '../utils/jwt.utils.js'

export const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requerido' })
    }
    
    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' })
    }
    
    req.user = decoded
    next()
}

export default authJWT