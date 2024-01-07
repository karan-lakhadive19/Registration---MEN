const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/empform")
.then(()=> {
    console.log("Connected")
}).catch((error)=> {
    console.log(error)
})