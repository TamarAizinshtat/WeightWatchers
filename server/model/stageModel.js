
const mongoose = require(`mongoose`);

const stageSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
    },
    sort:{
        type:Number
    },
    categoryId:{
        type: String
    }

}, { timestamps: true })


module.exports = mongoose.model('v', stageSchema);
