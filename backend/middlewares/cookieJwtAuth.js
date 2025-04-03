import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const cookieJwtAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch(err){
        res.clearCookie("token");
        res.status(401).json({message: "Unauthorized access. Please log in again."});
    }
}


export default cookieJwtAuth;