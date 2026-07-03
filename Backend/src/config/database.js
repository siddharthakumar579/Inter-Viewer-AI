const  mongoose = require('mongoose');

async function connectToDB() {

    try{

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in your environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to DataBase");

    }catch(err){
        console.error("Failed to connect to Database:", err.message);
        // Force the app to crash if the database can't connect
        process.exit(1);
    }
}

module.exports = connectToDB;