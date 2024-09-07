import jwt from 'jsonwebtoken';

export const tokenMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token) return res.status(403).json({"message": "Inicia sesión"})

    try{
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    }catch(err){
        return res().status(403).json({"message": "Inicia sesión"})
    }

    next();
}