const mongoose = require('mongoose');

const { Schema } = mongoose;

const ponSchema = new Schema(
    {
        pon_Name: {
            type: String,
            required: "Name cannot be blank",
            unique:true
        },
        pon_Rack: {
            type: Number,
            required: "Rack cannot be blank"
        },
        pon_Shelf: {
            type: Number,
            required: "Shelf cannot be blank"
        },
        pon_Slot: {
            type: Number,
            required: "Slot cannot be blank"
        },
        pon_Port: {
            type: Number,
            required: "Port cannot be blank"
        },
        olt: {
            type: Schema.Types.ObjectId,
            ref: "olt"
        }
    },
    { collection: 'pon' }
)
ponSchema.index({
    olt: 1,
    pon_Rack: 1,
    pon_Shelf: 1,
    pon_Slot: 1,
    pon_Port: 1,
  }, {
    unique: true
  });

module.exports = mongoose.model('pon', ponSchema)