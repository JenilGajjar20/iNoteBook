const express = require("express");
const cors = require("cors");

const connectToMongo = require("./db");

// Connecting to MongoDB
connectToMongo();

const PORT = process.env.PORT || 5000;

// Creating an express app
const app = express();

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
