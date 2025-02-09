import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import Event from "../../model/Event.js";
import mongoose from 'mongoose'; 

const GetMyBookedEvents = RequestHandler(async (req, res) => {
  try {
    const userId = req.guestuser._id;

    if (!userId) {
      throw new error("User ID is required", 400);
    }

    // Convert userId to ObjectId if it's not already
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const bookedEvents = await Event.find({ bookedBy: { $in: [objectIdUserId] } }).populate('bookedBy', '-password');

    if (!bookedEvents) {
        throw new error("No events found", 404);
    }

    ResponseHandler(res, { events: bookedEvents }, 200);

  } catch (err) {
    console.error(err);
    const statusCode = err instanceof error ? err.statusCode : 500;
    const message = err instanceof error ? err.message : "An error occurred";
    ResponseHandler(res, { message }, statusCode);
  }
});

export default GetMyBookedEvents;