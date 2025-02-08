import RequestHandler from "../utils/RequestHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import error from "../utils/Error.js";
import  jwt from 'jsonwebtoken'
import User from "../model/User.js";
const authUser = RequestHandler(async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token || req?.headers?.authorization?.split('Bearer ')[1];
        if (!token) {
            throw new error('Token not found', 400);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_Access_Token );
        const user = await User.findById(decoded?._id);

        if (!user) {
            throw new error('User not found', 404);
        }

        req.user = user;

        next();

    } catch (error) {
        if (error?.message === 'jwt expired') {

            ResponseHandler(res, null, 401)
        }
        else {

            ResponseHandler(res, null, error?.statusCode)
        }

    }
});

export default authUser;