const errorHandler = (err, req, res, next) => {
  console.error('[Error]:', err)
  
  const status = err.status || 500
  const message = err.message || 'Error interno del servidor'
  
  if (req.path.startsWith('/api')) {
    return res.status(status).json({ error: message })
  }
  
  res.status(status).send(message)
}

export default errorHandler