const mongoose = require('mongoose');

const { Schema } = mongoose;

const sdpSchema = new Schema(
    {
        sdp_Name: {
            type: String,
            required: 'Name cannot be blank',
            unique:true
        },
        sdp_Type: {
            type: String,
            required: 'Type cannot be blank'
        },
        sdp_Lat: {
            type: Number,
            required: 'Latitude cannot be blank'
        },
        sdp_Lng: {
            type: Number,
            required: 'Longitude cannot be blank'
        },
        ofccc: {
            type: Schema.Types.ObjectId,
            ref: "ofccc",
        }
    },
    { collection: 'sdp' }
)

module.exports = mongoose.model('sdp', sdpSchema)