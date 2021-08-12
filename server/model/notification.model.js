const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default:0
    },
    category: {
        type: String
    },
    title: {
        type: String,
    },
    content: {
        type: String
    },

})
module.exports = mongoose.model('Notifications', notificationSchema)