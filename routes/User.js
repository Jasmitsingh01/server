import { Router } from "express";
import UserLogin from "../controller/User/Login.js";
import UserRegsister from "../controller/User/Register.js";
import EditUser from "../controller/User/EditUser.js";
import authUser from "../middleware/authUser.js";
import uploadAvatarUser from "../controller/User/uploadImage.js";
import upload from "../middleware/upload.js";
import GetUserDeatils from "../controller/User/GetDetails.js";
import RefreshtokenUser from "../controller/User/RefreshToken.js";


const UserRouter=Router()

UserRouter.post('/login',UserLogin);
UserRouter.post('/register',UserRegsister);
UserRouter.put('/update',authUser,EditUser);
UserRouter.patch('/user-avatar',authUser,upload.single('avtar'),uploadAvatarUser)
UserRouter.get('/profile',authUser,GetUserDeatils)
UserRouter.patch('/refresh-token',RefreshtokenUser)

export default UserRouter
