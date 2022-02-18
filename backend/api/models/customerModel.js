const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema(
    {
        fullname: {
            type: String,
            required: 'fullname cannot be blank'
        },
        tel: {
            type: String,
            required: 'tel cannot be blank'
        },
        sdp: {
            type: Schema.Types.ObjectId,
            ref: "sdp",
        },
        
    },
    { collection: 'customer' }
)

module.exports = mongoose.model('customer', customerSchema)