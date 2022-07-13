const { ObjectId } = require('mongodb');
const mongoose = require(`mongoose`);
const { isEmail } = require('validator');

const { boolean } = require('webidl-conversions');

const DaySchema = new mongoose.Schema({
    date: Date,
    meals: [String]
})
const MeetingSchema = new mongoose.Schema({
    date: Date,
    weight: {
        type: Number,
        min: 40,
    }
})
const WeightSchema = new mongoose.Schema({
    startWeight: Date,
    meetings: [MeetingSchema]
})
const AddressSchema = new mongoose.Schema({
    city: {
        type: String,
        min: 2,
    },
    street: {
        type: String,
        min: 2,
    },
    number: {
        type: Number,
        min: 1,
    }
})
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 2,
    },
    lastName: {
        type: String,
        min: 2,
    },
    address: AddressSchema,

    email: {
        type: String,
        required: true,
        validate: [isEmail, 'please insert valid email'],
        unique: true,
        required: [true, 'you must insert!, required']
    },
    phone: {
        type: String,
        min: 9,
    },
    password: {
        type: String,
        minlength: 8,
    },
    hight: {
        type: Number,
        minlength: 8,
    },
    weight: WeightSchema,
    daySchema: DaySchema

}, { timestamps: true })


module.exports = mongoose.model('user', userSchema);
