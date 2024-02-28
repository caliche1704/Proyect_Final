import  jwt  from "jsonwebtoken";

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "Token No obtenido"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json({Error: "Token invalido"});
            } else {
                req.name = decoded.name; 
                next(); 
            }
        })
    }
}



export { verifyUser };
