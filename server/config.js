require('dotenv').config()
module.exports = {
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING,
    environment: process.env.ENVIRONMENT
}

