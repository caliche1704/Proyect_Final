

const obtenerDatosProtegidos = (req, res) => {
    // Accede al usuario autenticado a través de req.user
    const usuarioAutenticado = req.user;
    res.json({ Status: "Success", name: usuarioAutenticado });
};

export { obtenerDatosProtegidos };