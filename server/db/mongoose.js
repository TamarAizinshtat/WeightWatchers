const mongoose = require('mongoose');
const { connection_string } = require('../config')

class MongoDb {
    constructor() { }

    async connect() {
        const url = connection_string;
        await mongoose.connect(url);
        console.log(`db connected via mongoose`)
    }

}
module.exports = new MongoDb();