import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import RequestHandler from "../../utils/RequestHandler.js";
import GuestUser from "../../model/GusetUser.js";
import UploadImageOnline from '../../utils/cloudniary.js'

const uploadAvatarGuestUser=RequestHandler(async (req, res) => {
    try {
       const guestuser= req?.guestuser;
       const file=req?.file;

 if(!file){
    throw new error('invalid request',400)
 }
    const user=await GuestUser.findById(guestuser?._id)
    if(!user){
        throw new error('Failed to Upload Image',404)
    }
    const url=await UploadImageOnline(file?.path);
    if(!url){
        throw new error('Failed to Upload Image',500)
    }
  user.avtar=url;
  await user.save({validateBeforeSave:false});
       ResponseHandler(res,{message:"Image uploaded Sucessfuly"},200)
        
    } catch (error) {
        console.log(error?.message, error?.statusCode || 500);
        ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);


    }
})

export default uploadAvatarGuestUser