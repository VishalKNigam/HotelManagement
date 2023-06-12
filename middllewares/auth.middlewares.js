const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try{
            let decode = jwt.verify(token, "masai");
            if(decode){
                req.body.userID = decode.userID;
                req.body.user = decode.user;
                next();
            }else{
                res.json({msg: "Not Authorized"})
            }
        }catch(err){
            res.json({error: err.message})
        }
    }else{
        res.json({msg: "Please Login First!"})
    }
}
module.exports = {
    auth
}