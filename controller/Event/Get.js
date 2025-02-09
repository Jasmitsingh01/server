import RequestHandler from "../../utils/RequestHandler.js";
import ResponseHandler from "../../utils/ResponseHandler.js";
import error from "../../utils/Error.js";
import Event from '../../model/Event.js'  


const GetallEvent=RequestHandler(async (req, res) => {
    try {
        const events = await Event.find();
        if(events?.length <0){
            throw new error('No Event is Founded',404)
        }
        ResponseHandler(res,events,200)
    } catch (error) {
        console.log(error );        ResponseHandler(res, { message: error?.message }, error?.statusCode || 500);

    }
})


export default GetallEvent