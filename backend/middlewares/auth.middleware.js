import { verifyToken } from '../utils/jwt.utils. js'

export const authJWT = (req, res, next) => {     const token = req.headers.authorization?.replace('Bearer ', '')    
    if (!token) {
        return res.status(401).json({ error: 'Token requerido' })    }
    
    const decoded = verifyToken(token)    
    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' })    }
    
    req.user = decoded
    next()}
export default authJWT