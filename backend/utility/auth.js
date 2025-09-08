


const jwt=require('jsonwebtoken')

const authenticateJWT=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({error:'Token missing'})
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch {
        res.status(403).json({error:'Invalid token'})
    }
}
 
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};
module.exports = { authenticateJWT, isAdmin };