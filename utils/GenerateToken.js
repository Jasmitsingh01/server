import GuestUser from "../model/GusetUser.js";
import User from "../model/User.js";
import error from "./Error.js";



export async function GenreateGuestToken(user){

try {
    const find=await GuestUser.findById(user?._id);
    if(!find){
        throw new error("no user found",404)
    }
     const access_token= await find.generateAccessToken()
     const refresh_token= await find.generateRefreshToken()
    

     if(!access_token || !refresh_token){
        throw new error("failed to create token",500)
     }

     return { access_token ,refresh_token}

} catch (error) {
    console.log(error)
}

}



export async function GenerateToken(user){
    try {
        const find=await User.findById(user?._id);
        if(!find){
            throw new error("no user found",404)
        }
         const access_token= await find.generateAccessToken()
         const refresh_token= await find.generateRefreshToken()
        
    
         if(!access_token || !refresh_token){
            throw new error("failed to create token",500)
         }
    
         return { access_token ,refresh_token}
    
    } catch (error) {
        console.log(error)
    }   
}