import { Router } from "express";
import authUser from "../middleware/authUser.js";
import CreateEvent from "../controller/Event/Create.js";
import EditEvent from "../controller/Event/Edit.js";
import DeleteEvent from "../controller/Event/Delete.js";
import GetallEvent from "../controller/Event/Get.js";


const EventRouter=Router();

EventRouter.post('/create',authUser,CreateEvent);
EventRouter.put('/update',authUser,EditEvent)
EventRouter.delete('/remove',authUser,DeleteEvent)
EventRouter.get('/all',GetallEvent)
export default EventRouter;