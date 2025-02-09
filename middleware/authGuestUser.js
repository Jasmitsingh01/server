import RequestHandler from "../utils/RequestHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import error from "../utils/Error.js";
import jwt from "jsonwebtoken";
import GuestUser from "../model/GusetUser.js";
const authGuestUser = RequestHandler(async (req, res, next) => {
  try {

    const token =
      req?.cookies?.access_token ||
      req?.headers?.authorization?.split("Bearer ")[1];
    if (!token) {
      throw new error("Token not found", 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_Access_Token);
    const guestuser = await GuestUser.findById(decoded?._id);

    if (!guestuser) {
      throw new error("GuestUser not found", 404);
    }

    req.guestuser = guestuser;

    next();
  } catch (error) {
    if (error?.message === "jwt expired") {
      ResponseHandler(res, null, 401);
    } else {
      ResponseHandler(res, null, error?.statusCode);
    }
  }
});

export default authGuestUser;
