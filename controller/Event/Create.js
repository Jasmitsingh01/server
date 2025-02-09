import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import Event from "../../model/Event.js";
import broadcastToAll from "../../utils/BroadCastMessage.js";

const CreateEvent = RequestHandler(async (req, res) => {
  try {
    const { title, description, date, time, type,attendees } = req.body;
    if (!title || !description || !date || !time || !type ||!attendees) {
      throw new error("All field are required", 400);
    }
 
    const event = new Event({
      title,
      description,
      date,
      time,
      type,
      attendees,
      createdBy: req.user.id,
    });
    const save = await event.save();
    if (!save) {
      throw new error("Failed create event", 500);
    }
    broadcastToAll('createEvent','')
    ResponseHandler(res, event, 201);
  } catch (error) {
    console.log(error?.message, error?.statusCode || 500);
    ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);
  }
});


export default CreateEvent;