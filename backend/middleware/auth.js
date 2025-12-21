import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"

function auth_jwt(req, res, next){
    let token = req.cookies?.token;
    if(!token){
        return res.status(401).json({msg:"No token found"});
    }
    try{
         const decodeduser  = jwt.verify(token , process.env.SECRET_CODE);
         console.log(decodeduser);
         req.user = decodeduser.user
         next();
    }catch(err){
        return res.status(401).json({msg:"Invalid token"});
    }
}

export default auth_jwt