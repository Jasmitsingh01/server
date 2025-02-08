import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import Event from "../../model/Event.js";

const DeleteEvent = RequestHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new error("Invaild Request parameters", 400);
    }
    const event = await Event.findById(req.params.id);
    if (!event || event.createdBy.toString() !== req.user.id) {
      throw new error("Unauthorized", 403);
    }
    await event.remove();
    io.emit("eventDeleted", req.params.id);
    ResponseHandler(res, { message: "Event deleted" }, 204);
  } catch (error) {
    console.log(error?.message, error?.statusCode || 500);
    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  }
});


export default DeleteEvent
