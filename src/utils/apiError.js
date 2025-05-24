class apiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        error = [],
        stack = '',
    ){
        super(message)                       // override the default message of the Error class
        this.statusCode = statusCode,      
        this.message = message, 
        this.error = error,
        this.success = false,
        this.data = null

        if(stack){                 //  Handling the stack trace
            this.stack = stack 
        }else{
            Error.captureStackTrace(this, this.constructor)  //  trims the stack so that it starts at the line where new apiError() was created, omitting the constructor itself.
        }
    }
}


export default apiError