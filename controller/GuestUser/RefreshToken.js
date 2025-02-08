import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import RequestHandler from "../../utils/RequestHandler.js";
import GuestUser from "../../model/GusetUser.js";
import { GenreateGuestToken } from "../../utils/GenerateToken.js";


const RefreshtokenGuest = RequestHandler(async (req, res) => {
    try {
        const token = req.cookies.refresh_token || req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            throw new error("Token not found",400);
        }


        const verfiy= jwt.verify(token,process.env.JWT_SECRET_KEY_Refreseh_Token);
         if(!verfiy){
            throw new error('Invalid token',401)
         }
        const user = await GuestUser.findById(verfiy?._id);
        if (!user) {
            throw new error("User not found",404);
        }
        const { access_token, refresh_token } = await GenreateGuestToken(user);

    if (!access_token || !refresh_token) {
      throw new error("Server Error", 500);
    }

    res.cookie("access_token", access_token, {
      httpOnly: true,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
    });
        
        ResponseHandler(res,{message:"Token genrated",token:{access_token,refresh_token}},200)
    }
    catch (err) {
        console.error(err?.message,err?.statusCode)
        if(err?.message === 'jwt expired'){
        ResponseHandler(res,{message:err?.message},401)
        }
        else{

            ResponseHandler(res,{message:err?.message},err?.statusCode)
        }
        
    }

});

export default RefreshtokenGuest