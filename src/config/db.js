const mongoose = require('mongoose');

async function connectDb() {
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo connecté");
    } catch(err) {
        console.error("Erreur de connexion à mongo");
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDb;