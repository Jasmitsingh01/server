class error extends Error {
    statusCode=0
  constructor( message,  statusCode, stack) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
     if(stack) {
      this.stack = stack;
     } else {
        Error.captureStackTrace(this, this.constructor);
    }
}
  
}
export default error;
