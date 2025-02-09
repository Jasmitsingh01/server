import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import RequestHandler from "../../utils/RequestHandler.js";
import GuestUser from "../../model/GusetUser.js";
import { GenreateGuestToken } from "../../utils/GenerateToken.js";

const Guestlogin = RequestHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new error("Invalid Email or Password", 400);
    }
    const guestUser = await GuestUser.findOne({ email: email });

    if (!guestUser) {
      throw new error("Invalid Email or Password", 403);
    }
    const isPassword = await guestUser.isPasswordMatch(password);
    if (!isPassword) {
      throw new error("Invalid Email or Password", 403);
    }
    const { access_token, refresh_token } = await GenreateGuestToken(guestUser);

    if (!access_token || !refresh_token) {
      throw new error("Server Error", 500);
    }

    res.cookie("access_token", access_token, {
      httpOnly: true,    
      path:'/',
      sameSite:'None',    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,    
      path:'/',
      sameSite:'None',
           
    });
    ResponseHandler(
      res,
      { message: "User logged IN", token: { access_token, refresh_token } },
      200
    );
  } catch (error) {
    console.log(error?.message, error?.statusCode || 500);
    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  }
});

export default Guestlogin;
