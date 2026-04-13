const handleError = (res, error, mensaje = "Algo sucedió", codigo = 500) => {
    console.log(`${mensaje} ${error}`)
    return res.status(codigo).json(
        {
            ok: false,
            mensaje: `ERROR -> ${mensaje}`
        }
    )
    console.log('No se ejecuta')
}

export default handleError