import { Router } from "express";
import upload from "../middleware/upload.js";
import authGuestUser from "../middleware/authGuestUser.js";
import Guestlogin from "../controller/GuestUser/Login.js";
import GuestResgister from "../controller/GuestUser/Register.js";
import EditGuestUser from "../controller/GuestUser/EditGuestUser.js";
import uploadAvatarGuestUser from "../controller/GuestUser/uploadImage.js";
import GetGuestUserDetail from "../controller/GuestUser/GetDetails.js";
import RefreshtokenGuest from "../controller/GuestUser/RefreshToken.js";

const GuestRouter=Router();

GuestRouter.post('/login',Guestlogin);
GuestRouter.post('/register',GuestResgister);
GuestRouter.put('/update',authGuestUser,EditGuestUser);
GuestRouter.patch('/user-avatar',authGuestUser,upload.single('avtar'),uploadAvatarGuestUser)
GuestRouter.get('/profile',authGuestUser,GetGuestUserDetail)
GuestRouter.patch('/refresh-token',RefreshtokenGuest)

export default GuestRouter