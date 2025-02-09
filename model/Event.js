import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    time:{
        type:String,
    },
    type:{
        type:String,
        require:true
    },
    attendees:{type:Number,require:true,default:0},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookedBy:{ type: [mongoose.Schema.Types.ObjectId], ref: 'GuestUser' }
});
const Event = mongoose.model('Event', EventSchema);

export default Event