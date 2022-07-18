const { ObjectId } = require('mongodb');
const mongoose = require(`mongoose`);

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 2,
    },
    weight: {
        type: Number,
        min: 30,
    }
})
const MeetingsSchema = new mongoose.Schema({
    date: Date,
    users: [UserSchema]
},{ timestamps: true })



module.exports = mongoose.model('meeting', MeetingsSchema);













