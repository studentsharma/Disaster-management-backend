import mongoose from "mongoose";

const helpSchema = mongoose.Schema( {
    firstName : String,
    latitude : {
        type : String,
        required : true
    },
    longitude : {
        type : String,
        required : true
    },
    description : String,
    urgency : Number,
    Mobile : String
    

}, {timestamps : true} );

const Help = mongoose.model("Help", helpSchema);

export default Help;