// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Event = require("../models/Event");
const EventRouter = express.Router();

// *****VISUALIZAMOS TODOS LOS EVENTOS*****
EventRouter.get("/events", async (req, res) => {
    let events = await Event.find({})
    return res.status(200).send({
        success: true,
        events
    })
})

// *****VISUALIZAR UN EVENTO*****
EventRouter.get("/findEvent/:id", async (req, res) => {
    const {
        id
    } = req.params
    try {
        let event = await Event.findById(id).populate({path:"participating", select:"name surname"})

        if (!event) {
            res.status(400).send({
                success: false,
                message: "Event not found"
            })
        }
        return res.status(200).send({
            success: true,
            event          
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVOS EVENTOS*****
EventRouter.post("/newEvent",auth,async (req, res) => {
    const {
        activityId,
        description,
        price,
        userCreateId,
        dateActivity,    
    } = req.body
    try {
        // *****CREAMOS ERRORES*****
        if (!activityId || !description || !price  || !userCreateId ||!dateActivity) {
            return res.status(400).send({
                success: false,
                message: "You have not completed all the required fields"
            })
        }

        let event = new Event({
            activity: activityId,
            description,
            price,
            userCreate: userCreateId,
            dateActivity
        })

        // *****CONFIRMACION GUARDADO*****
        await event.save()
        return res.status(200).send({
            success: true,
            message: "Event created successfully",
            event
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message

        })
    }
})

// ****MODIFICAR DATOS DEL EVENTO****
EventRouter.put("/updateEvent/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    const {
        activityId,
        description,
        price,
        userCreateId,
        dateActivity
    } = req.body
    try {
        await Event.findOneAndUpdate(id, {
            activityId,
            description,
            price,
            userCreateId,
            dateActivity
        })
        return res.status(200).send({
            success: true,
            message: ("Event data is modified")
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
})


// ****BORRAMOS EVENTO*****
EventRouter.delete("/deleteEvent/:id",auth,authAdmin,async (req, res) => {
    const {
        id
    } = req.params
    try {
        await Event.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "The event has been deleted"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****EXPORTAMOS*****
module.exports = EventRouter