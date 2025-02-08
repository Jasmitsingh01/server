import RequestHandler from "../../utils/RequestHandler";
import ResponseHandler from "../../utils/ResponseHandler";
import error from "../../utils/Error";
import User from "../../model/User";

const UserLogout=RequestHandler(async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error?.message, error?.statusCode || 500);
        ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);

    }
})