const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose")
const unknownRouter = require ("./routes/unknown")

const app = express()
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json())
app.use("/unknown", unknownRouter);

mongoose.connect("mongodb://localhost:27017/bdgsa", (err) => { 
if(err) console.error(err);
console.log("connected to MongoDB")
})

app.listen(port, () => console.log(`Server is Running on port ${port}`))