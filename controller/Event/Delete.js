import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import Event from "../../model/Event.js";
import broadcastToAll from "../../utils/BroadCastMessage.js";

const DeleteEvent = RequestHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new error("Invaild Request parameters", 400);
    }
    const event = await Event.deleteOne({
      _id :id,
      createdBy:req?.user?._id
    });
    if (!event) {
      throw new error("Unable to Delete Event", 403);
    }
    broadcastToAll('deletEvent',"")
    ResponseHandler(res, { message: "Event deleted" }, 204);
  } catch (error) {
    console.log(error );    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  }
});


export default DeleteEvent
