const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
        // Wraps it with Promise.resolve(...) to ensure it handles both synchronous and asynchronous functions.
        // If the promise is rejected (i.e., if an error is thrown), it catches the error and passes it to next(err), which is the Express error handler.
    }
}


// const asyncHandler = (fn) => async(req, res, next) => {
//     try{
//         await fn(req, res, next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success: false ,
//             message: err.message
//         })
//     }
// }

export default asyncHandler