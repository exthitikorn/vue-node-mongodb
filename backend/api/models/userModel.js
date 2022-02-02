const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: 'username cannot be blank',
            unique:true
        },
        password: {
            type: String,
            required: 'password cannot be blank'
        },
        Line_id: {
            type: String,
            required: 'Line Id cannot be blank'
        }
        
    },
    { collection: 'user' }
)

module.exports = mongoose.model('user', userSchema)