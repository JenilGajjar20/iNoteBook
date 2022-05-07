const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://admin-jenil:gS5qnl45uDhT3rBW@cluster0.4cst4.mongodb.net/iNoteBook?authSource=admin&replicaSet=atlas-144kur-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectToMongo;
