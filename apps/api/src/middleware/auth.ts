import jwt from 'jsonwebtoken'

const varifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(authHeader){
        const [,token] = authHeader.split(' ')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, {username}) => {
            if(err){
                return res.status(403).json({message: 'Forbidden'})
            }
            req.user = username //to send this information to next routes
            next()
        })
    } else {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

export default varifyToken