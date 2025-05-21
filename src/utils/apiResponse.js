class apiResponse {
 constructor() {
   this.statusCode = statusCode;
   this.message = message;
   this.data = null;
   this.error = null;
   this.success = statusCode < 400;
 }    
}