import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import Event from "../../model/Event.js";

const EditEvent = RequestHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, date, time, type } = req.body;
    if (!id) {
      throw new error("Invaild Request parameters", 400);
    }
    const event = await Event.findById(req.params.id);
    if (!event || event.createdBy.toString() !== req.user.id) {
      throw new error("Unauthorized", 403);
    }
    if (title) {
      event.title = title;
    }
    if (description) {
      event.description = description;
    }
    if (date) {
      event.date = date;
    }
    if (time) {
      event.time = time;
    }
    if (type) {
      event.type = type;
    }

    await event.save({ validateBeforeSave: false });
    io.emit("eventUpdated", req.params.id);
    ResponseHandler(res, { message: "Event Updated" }, 204);
  } catch (error) {
    console.log(error?.message, error?.statusCode || 500);
    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  }
});


export default EditEvent;