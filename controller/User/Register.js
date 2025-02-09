import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import User from "../../model/User.js";
import { GenerateToken } from "../../utils/GenerateToken.js";
const UserRegsister = RequestHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      throw new error("Invaild request", 400);
    }

    const find = await User.findOne({ email: email });
    if (find) {
      throw new error("Email Already Exits", 409);
    }
    const user = new User({ name, email, password: password });
    await user.save();
    const { access_token, refresh_token } = await GenerateToken(user);

    if (!access_token || !refresh_token) {
      throw new error("Server Error", 500);
    }

    res.cookie("access_token", access_token, {
      httpOnly: true,            
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,            
    });
   

    ResponseHandler(
      res,
      {
        message: "User registered successfully",
        token: { access_token, refresh_token },
      },
      201
    );
  } catch (error) {
    console.log(error?.message, error?.statusCode || 500);
    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  }
});

export default UserRegsister;
