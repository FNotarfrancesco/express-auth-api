const isAuthenticated = ( req, res, next ) => {
    console.log('isAuthenticated - session:', req.session?.ID)
    console.log('isAuthenticated - user:', req.user)
    if ( req.isAuthenticated() ) {
        return next()
    }
    if (req.path.startsWith('/api')) {
        return res.status(401).json({ error: 'No autorizado' })
    }
    res.redirect('/api/auth/login')
}

export default isAuthenticated