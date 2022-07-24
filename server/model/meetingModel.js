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

const UsersInMeetingSchema = new mongoose.Schema({
    usersInMeeting: [UserSchema]
},{ timestamps: true })

const MeetingsSchema = new mongoose.Schema({
    date: Date,
    userInMeeting:UsersInMeetingSchema
})


module.exports = mongoose.model('meeting', MeetingsSchema);


