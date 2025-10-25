const mongoose = require('mongoose');

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to MongoDb through mongoose")
    } catch {
        console.error("Failed to connect to mongoDB")
    }
}

module.exports = DBConnect;