const mongoose = require("mongoose");

const { Schema } = mongoose;

const sdpSchema = new Schema(
  {
    sdp_Name: {
      type: String,
      required: "Name cannot be blank",
      unique: true,
    },
    sdp_Type: {
      type: String,
      required: "Type cannot be blank",
    },
    loc: [
      { 
        type: Number,
        required: true
      }
    ],
    ofccc: {
      type: Schema.Types.ObjectId,
      ref: "ofccc",
    },
  },
  { collection: "sdp" }
);
sdpSchema.index( { loc : "2dsphere" } )


module.exports = mongoose.model("sdp", sdpSchema);
