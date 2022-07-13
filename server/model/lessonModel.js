
const mongoose = require(`mongoose`);

const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
    },
    sort:{
        type:Number
    },
    stageId:{
        type: String, 
    }

}, { timestamps: true })


module.exports = mongoose.model('lesson', lessonSchema);
