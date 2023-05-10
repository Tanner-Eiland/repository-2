require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConfig");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

// ConnectDB
connectDB();

// Custom Middlware Function
app.use(logger);

app.use(cors(corsOptions));


// Built in middleware functions in express
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));


// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.use("/subdir", require("./routes/subdir"));
// API Route
app.use("/states", require("./routes/api/states"));


// 404 Route for un-defined
app.all("*", (req, res) => {
    res.status(404);
    if (req,accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found"});
    } else {
        res.type("txt").send("404 Not Found");
    }
});

// Error logger
app.use(errorHandler);

mongoose.connection.once("open", ()=>{
    console.log("connected to mongoDB")
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
})

