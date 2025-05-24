class apiResponse {
 constructor(statusCode, data, message = "success") {
   this.statusCode = statusCode;
   this.message = message;
   this.data = null;
   this.error = null;
   this.success = statusCode < 400;
 }    
}