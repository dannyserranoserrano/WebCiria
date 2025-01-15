// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Event = require("../models/Event");
const File = require("../models/File");
const Reserve = require("../models/Reserve");
const EventRouter = express.Router();

// *****VISUALIZAMOS TODOS LOS EVENTOS*****
EventRouter.get("/events", async (req, res) => {
    let events = await Event.find({}).populate({
        path: "participating",
        select: "name surname"
    })
    return res.json({
        success: true,
        events
    })
})

// *****VISUALIZAR UN EVENTO*****
EventRouter.get("/findEvent/:eventId", async (req, res) => {
    const {
        eventId
    } = req.params
    try {
        let event = await Event.findById(eventId).populate({
            path: "participating",
            select: "name surname"
        }).populate({
            path: "activity",
            select: "name pay"
        }).populate({
            path: "userCreate",
            select: "name surname"
        })

        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Evento no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            event
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVOS EVENTOS*****
EventRouter.post("/newEvent", auth, async (req, res) => {

    const { id } = req.user // Nos reconoce el usuario mediante el Tokken (auth.js)
    const {
        activityId,
        name,
        description,
        price,
        dateActivity,
    } = req.body

    try {
        // *****COMPROBAMOS ERRORES*****
        if (!activityId || !description || !price || !dateActivity) {
            return res.json({
                success: false,
                message: "No has completado todos los campos"
            })
        }

        let event = new Event({
            activity: activityId,
            name,
            description,
            price,
            userCreate: id,
            dateActivity,
            participating: id
        })

        // *****CONFIRMACION GUARDADO*****
        await event.save()
        return res.json({
            success: true,
            message: "Evento creado correctamente",
            event
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message

        })
    }
})

// ****MODIFICAR DATOS DEL EVENTO****
EventRouter.put("/updateEvent/:eventId", auth, async (req, res) => {

    const {
        id
    } = req.user // Nos reconoce el usuario mediante el Tokken (auth.js)
    const {
        eventId
    } = req.params
    const {
        activityId,
        name,
        description,
        price,
        dateActivity
    } = req.body
    try {
        // *****Condición de si no eres el creador no puedes modificar*****
        let userCreateId = await Event.findById(eventId)
        console.log(userCreateId)
        if (!userCreateId.userCreate == id) {
            res.status(400).json({
                success: false,
                message: "No puedes modificar el evento porque no eres el creador"
            })
        }

        await Event.findByIdAndUpdate(eventId, {
            activityId,
            name,
            description,
            price,
            dateActivity
        })
        return res.json({
            success: true,
            message: ("El Evento ha sido modificado")
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
})


// ****BORRAMOS EVENTO*****
EventRouter.delete("/deleteEvent/:eventId", auth, authAdmin, async (req, res) => {
    const {
        eventId
    } = req.params
    try {

        const event = await Event.findById(eventId)
        const name = event.name

        await Event.findByIdAndDelete(eventId)

        // *****Borramos el evento de File*****
        let fileList = []
        File.find({
            event: eventId
        }).then(file => {
            file.map((searches) => {              
                fileList.push(searches.event)           
                Event.findByIdAndDelete(searches._id, function (err, searches) {
                    if (err) {
                        console.log(err, "error que no conozco")
                    } else {
                        fileList.map((eventoId) => {
                            File.findByIdAndUpdate(eventoId, {
                                $push: {
                                    event: "nulo"
                                }
                            })
                        })
                        console.log("Eventos eliminados de File correctamente")
                    }
                })
            })
        })

        // *****Borramos las reservas de ese evento*****
        let reserveList = []
        Reserve.find({
            event: eventId
        }).then(reserve => {
            reserve.map((searches) => {
                reserveList.push(searches.event)
                Reserve.findByIdAndDelete(searches._id, function (err, searches) {
                    if (err) {
                        console.log(err, "error que no conozco")
                    } else {
                        reserveList.map((reservaId) => {
                            Reserve.findByIdAndDelete(reservaId)
                        })
                        console.log("Reservas de este evento eliminado correctamente")
                    }
                })
            })
        })

        return res.json({
            success: true,
            message: "El Evento ha sido borrado"
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

// *****EXPORTAMOS*****
module.exports = EventRouter