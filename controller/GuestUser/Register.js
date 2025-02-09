import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import RequestHandler from "../../utils/RequestHandler.js";
import GuestUser from "../../model/GusetUser.js";
import { GenreateGuestToken } from "../../utils/GenerateToken.js";

const GuestResgister = RequestHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      throw new error("Invaild request", 400);
    }

    const find = await GuestUser.findOne({ email: email });
    if (find) {
      throw new error("Email Already Exits", 409);
    }
    const user = new GuestUser({ name, email, password: password });
    await user.save();
    const token = await GenreateGuestToken(user);
    if (!token) {
      throw new error("Server Error", 500);
    }
    const {access_token,refresh_token}=token

    res.cookie("access_token", access_token, {
      httpOnly: true,    
      path:'/',
      Secure:true   });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,    
      path:'/',
      Secure:true  });

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

export default GuestResgister;
