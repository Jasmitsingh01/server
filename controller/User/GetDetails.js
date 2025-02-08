import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";

const GetUserDeatils=RequestHandler(async (req, res) => {
    try {
        const user= req?.guestuser
       if(!user){
        throw new error("Failed to find User",404)

       }

       ResponseHandler(res,user,200)
        
    } catch (error) {
        console.log(error?.message, error?.statusCode || 500);
        ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);

    }
})

export default GetUserDeatils