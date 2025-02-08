import ResponseHandler from "../../utils/ResponseHandler";
import error from "../../utils/Error";
import RequestHandler from "../../utils/RequestHandler";
import GuestUser from "../../model/GusetUser";


const Guestlogut=RequestHandler(async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error?.message, error?.statusCode || 500);
        ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);

    }
})