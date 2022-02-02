const mongoose = require('mongoose');

const { Schema } = mongoose;

const oltSchema = new Schema(
    {
        olt_Name: {
            type: String,
            required: 'Name cannot be blank',
            unique:true
        }
    },
    { collection: 'olt' }
)

module.exports = mongoose.model('olt', oltSchema)