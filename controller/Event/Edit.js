import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js"; // Capitalized Error for consistency
import Event from "../../model/Event.js";
import broadcastToAll from "../../utils/BroadCastMessage.js";

const EditEvent = RequestHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, date, time, type } = req.body;

    if (!id) {
      throw new error("Invalid Request parameters", 400); // Use capitalized error
    }

    const event = await Event.findById(id); // Use the 'id' variable
    if (!event) {
        throw new error("Event not found", 404); // More appropriate error code
    }

    if (event.createdBy.toString() !== req.user.id) {
      throw new error("Unauthorized", 403); // Use capitalized error
    }

    // More efficient and cleaner way to update fields:
    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (date) updates.date = date;
    if (time) updates.time = time;
    if (type) updates.type = type;

    // Only update if there are changes
    if (Object.keys(updates).length > 0) {
      await Event.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }); // Use findByIdAndUpdate
    } else {
      return ResponseHandler(res, { message: "No updates provided" }, 200); // Handle no updates case
    }

    broadcastToAll('updateEvent',"")

    ResponseHandler(res, { message: "Event Updated" }, 200);
  } catch (err) { // Use 'err' instead of 'error' for convention
    console.error(err); // Use console.error for errors
    const statusCode = err instanceof Error ? err.statusCode : 500; // Check if it's a custom error
    ResponseHandler(res, { message: err.message || "An error occurred" }, statusCode); // Provide a default message
  }
});

export default EditEvent;