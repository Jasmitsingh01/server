import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import RequestHandler from "../../utils/RequestHandler.js";
import User from "../../model/User.js";

const EditUser=RequestHandler(async (req,res)=>{
 try {
    const {name, email,contact,location}=req.body;
    const user=req.user
    const Myuser=await User.findById(user?._id);
    if(!Myuser){
        throw new error('no user is found',404)

    }

    if(name){
        Myuser.name=name;
    }
    
    if(email){
        Myuser.email=email;
    }
    if(contact){
        Myuser.contact=contact;
    }
    if(location){
        Myuser.location=location;
    }

    await Myuser.save({validateBeforeSave:false})
    ResponseHandler(res, { message: "user update successfully" }, 200);
 } catch (error) {
    console.log(error?.message, error?.statusCode || 500);
    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  
 }
})


export default EditUser