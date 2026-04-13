const isAuthenticated = ( req, res, next ) => {

    if ( req.isAuthenticated() ) {
        return next()
    }

    // Si es una request API, devolver JSON con 401
    if (req.path.startsWith('/api')) {
        return res.status(401).json({ error: 'No autorizado' })
    }

    // Para las vistas, redirigir al login
    res.redirect('/api/auth/login')

}

export default isAuthenticated