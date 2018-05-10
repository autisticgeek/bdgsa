const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose")
const path = require ("path")
const morgan = require ("morgan")
const userRoute = require ("./routes/userRoute")
const authRoute = require ("./routes/authRoute")
const saleRoute = require ("./routes/saleRoute")

require ("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8080;
app.use("/api", expressJwt({secret: process.env.SECRET}))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use("/api/user", userRoute);
app.use("/auth", authRoute);
app.use("/api/sale", saleRoute);

const db= process.env.MONGODB_URI
mongoose.connect(db, (err) => { 
if(err) console.error(err);
console.log("connected to MongoDB")
})

app.listen(port, () => console.log(`Server is Running on port ${port}`))