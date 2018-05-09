const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose")
const userRoute = require ("./routes/userRoute")

const app = express()
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json())
app.use("/userRoute", userRoute);

mongoose.connect("mongodb://localhost:27017/bdgsa", (err) => { 
if(err) console.error(err);
console.log("connected to MongoDB")
})

app.listen(port, () => console.log(`Server is Running on port ${port}`))