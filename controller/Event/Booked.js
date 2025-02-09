import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js"; // Renamed to error for clarity
import Event from "../../model/Event.js";
import broadcastToAll from "../../utils/BroadCastMessage.js";

const BookedEvent = RequestHandler(async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new error("Invalid Request parameters", 400);
    }

    const event = await Event.findById(id);

    if (!event) {
      throw new error("Event not found", 404);
    }

    const isAlreadyBooked = event?.bookedBy?.some(bookedById => bookedById?.toString() === req?.guestuser?._id?.toString());

    if (isAlreadyBooked) {
      throw new error("You have already booked this event", 400); // Or 409 Conflict
    }
    if( event?.bookedBy?.length === event?.attendees){
     throw new error("All Booking are Fulled",400)
    }
    //  Logic to book the event (add the user's ID to bookedBy):
     if (!event.bookedBy) {
         event.bookedBy = [];
     }
    event.bookedBy.push(req.guestuser._id);
    await event.save(); // Important: Save the changes to the database
    broadcastToAll('bookedEvent','')
    ResponseHandler(res, { message: "Event Booked Successfully" }, 200); // More accurate message
  } catch (err) {
    console.error(err);

    // More robust error handling:
    const statusCode = err instanceof error ? err.statusCode : 500;
    const message = err instanceof error ? err.message : "An error occurred"; 

    ResponseHandler(res, { message }, statusCode); // Send the extracted message
  }
});

export default BookedEvent;