const express = require("express");
const errorHandler=require("./middleware/errorHandler")
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
dotenv.config();
const Port = process.env.PORT || 8000;
connectDb();
const app = express();
app.use(express.json());
app.use('/api/contacts',require("./routes/contactsRoute"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler)
app.listen( Port,() => {
    console.log(`This server is running on port ${Port}`);
});
