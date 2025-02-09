import { Router } from "express";
import authUser from "../middleware/authUser.js";
import CreateEvent from "../controller/Event/Create.js";
import EditEvent from "../controller/Event/Edit.js";
import DeleteEvent from "../controller/Event/Delete.js";
import GetallEvent from "../controller/Event/Get.js";
import authGuestUser from "../middleware/authGuestUser.js";
import BookedEvent from "../controller/Event/Booked.js";
import GetMyBookedEvents from "../controller/Event/GetBookedEvent.js";


const EventRouter=Router();

EventRouter.post('/create',authUser,CreateEvent);
EventRouter.put('/update/:id',authUser,EditEvent)
EventRouter.delete('/remove/:id',authUser,DeleteEvent)
EventRouter.get('/all',GetallEvent)
EventRouter.patch('/booked/:id', authGuestUser,BookedEvent)
EventRouter.get('/my-booked-event',authGuestUser,GetMyBookedEvents)

export default EventRouter;