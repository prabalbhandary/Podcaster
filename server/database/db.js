const mongoose = require('mongoose')
require("colors")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB,{dbName: process.env.DB_NAME})
        const host = conn.connection.host
        console.log(`MongoDB connected to ${host}`.bgGreen.white)

    } catch (error) {
        console.log(`Error: ${error}`.bgRed.white)
    }
}

module.exports = connectDB