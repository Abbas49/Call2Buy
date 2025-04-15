const errorHandler = async (err, req, res, next)=>{
    if(process.env.NODE_ENV){
        console.error(err.stack);
    }
    res.status(err.statusCode || 500).json({message: err.message});
}

export default errorHandler;