const mongoose = require('mongoose');

const { Schema } = mongoose;

const oltSchema = new Schema(
    {
        olt_Name: {
            type: String,
            required: 'Name cannot be blank',
            unique:true
        },
        olt_Lat:{
            type: Number,
            required: 'Latitude cannot be blank'
        },
        olt_Lng:{
            type: Number,
            required: 'Longitude cannot be blank'
        }
    },
    { collection: 'olt' }
)

module.exports = mongoose.model('olt', oltSchema)