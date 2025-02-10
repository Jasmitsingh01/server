import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import User from "../../model/User.js";
import { GenerateToken } from "../../utils/GenerateToken.js";

const UserLogin = RequestHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new error("Invalid Email or Password", 400);
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new error("Invalid Email or Password", 403);
    }
    const isPassword = await user.isPasswordMatch(password);
    if (!isPassword) {
      throw new error("Invalid Email or Password", 403);
    }
    const { access_token, refresh_token } = await GenerateToken(user);

    if (!access_token || !refresh_token) {
      throw new error("Server Error", 500);
    }

       // *** Set cookies *before* calling ResponseHandler ***
       res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true, // Important for HTTPS!
        sameSite: 'none', // Or 'none' with secure: true if needed for CORS
        path: '/', // Or your path
      });
  
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true, // Important for HTTPS!
        sameSite: 'none', // Or 'none' with secure: true if needed for CORS
        path: '/', // Or your path
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

export default UserLogin;
