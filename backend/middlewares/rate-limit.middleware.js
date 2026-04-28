import rateLimit from "express-rate-limit"

const keyGeneratorIpFallback = (req) => {
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.body?.email || keyGeneratorIpFallback(req),
  message: 'Demasiados intentos de login. Intentalo mas tarde.',
  skip: (req) => !req.body?.email,
})