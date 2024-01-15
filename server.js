const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const errorHandler = require("./utils/errorHandler");
const app = express();
app.use(compression({ threshold: 1008 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/v1/", require("./routes/routes"));
app.use(errorHandler);
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas..."))
    .catch((err) =>
        console.error(
            "Error occurred while connecting to MongoDB Atlas...\n",
            err
        )
    );

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = { handler: serverless(app) };
