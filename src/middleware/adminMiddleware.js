function adminMiddleware(req, res, next) {

    if (req.usuario.tipo !== "ADMIN") {

        return res.status(403).json({
            mensagem: "Acesso permitido apenas para administradores."
        });

    }

    next();

}

export default adminMiddleware;