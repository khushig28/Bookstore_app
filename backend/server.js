const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const cors = require('cors');

await connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

app.use("/api/books", require('./routes/bookRoutes')) 
app.use("/api/users", require('./routes/userRoutes')) 
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})