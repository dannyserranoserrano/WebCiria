const express = require("express");
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const UserRouter = require("./api/UserRouter")
const PaymentRouter = require("./api/PaymentRouter")
const FileRouter = require("./api/FileRouter")
const EventRouter = require("./api/EventRouter")
const ActivityRouter = require("./api/ActivityRouter")
const ReserveRouter = require("./api/ReserveRouter")

const fs = require("fs") //Se usa para tener base de datos e local

// *****SE USA PARA METER DATOS*****
app.use(express.json({
    extended: true
}));
app.use(express.urlencoded());
app.use(fileUpload({
    useTempFiles: true
}))

// *****LLAMAMOS A LOS ENRUTAMIENTOS*****
app.use("/api", UserRouter)
app.use("/api", PaymentRouter)
app.use("/api", FileRouter)
app.use("/api", EventRouter)
app.use("/api", ActivityRouter)
app.use("/api", ReserveRouter)

// *****DECLARAMOS URL*****
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {}).then(() => {
    console.log("DB IS CONNECTED")
}).catch(error => {
    console.log(error)
})



// *****CONEXION CON EL SERVIDOR*****
const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`SERVER CONNECT ON PORT ${PORT}`)
})