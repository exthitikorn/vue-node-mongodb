const mongoose = require('mongoose');

const { Schema } = mongoose;

const ofcccSchema = new Schema(
    {
        ofccc_Name: {
            type: String,
            required: 'Name cannot be blank',
            unique:true
        },
        ofccc_Type: {
            type: String,
            required: 'Type cannot be blank'
        },
        ofccc_Lat: {
            type: Number,
            required: 'Latitude cannot be blank'
        },
        ofccc_Lng: {
            type: Number,
            required: 'Longitude cannot be blank'
        },
        pon: {
            type: Schema.Types.ObjectId,
            ref: "pon",
            unique:true
        },
    },
    { collection: 'ofccc' }
)

module.exports = mongoose.model('ofccc', ofcccSchema)