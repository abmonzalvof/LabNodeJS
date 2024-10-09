
const errorHandler = (err,req,res,next) => {
    console.log('Error - ',err)
    const {message} = err
    res.status(500).json({message})
    next()
}

export default errorHandler