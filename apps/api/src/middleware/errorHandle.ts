
const errorHandler = (err,req,res,next) => {
    console.log('error',err)
    res.status(500).json({message: 'Error handle'})
    next()
}

export default errorHandler