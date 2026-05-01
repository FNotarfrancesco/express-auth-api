import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
        rol: user.rol
    }
    
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}