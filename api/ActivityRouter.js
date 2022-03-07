// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Activity = require("../models/Activity");
const ActivityRouter = express.Router();

// *****VISUALIZAMOS LAS ACTIVIDADES*****
ActivityRouter.get("/activities", auth,async (req, res) => {
    let activity = await Activity.find({})
    return res.status(200).send({
        success: true,
        activity
    })
})

// *****VISUALIZAR UNA ACTIVIDAD*****
ActivityRouter.get("/findActivity/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    try {
        let activity = await Activity.findById(id)
        if (!activity) {
            res.status(400).send({
                success: false,
                message: "Activity not found"
            })
        }
        return res.status(200).send({
            success: true,
            activity
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVAS ACTIVIDADES*****
ActivityRouter.post("/newActivity",auth,authAdmin,async (req, res) => {
    const {
        activityName,
        pay
    } = req.body
    let activity = new Activity({
        activityName,
        pay
    })

    // *****Creamos los errores*****
    if (!activityName || !pay) {
        return res.status(400).send({
            success: false,
            message: "You have not completed all the required fields"
        })
    }
    // *****Confirmación de guardado*****
    await activity.save()
    return res.status(200).send({
        success: true,
        message: "Activity created successfully",
        activity
    })
})

// ****MODIFICAR DATOS DE LA ACTIVIDAD****
ActivityRouter.put("/updateActivity/:id",auth,authAdmin,async (req, res) => {
    const {
        id
    } = req.params
    const {
        activityName,
        pay
    } = req.body
    try {
        await Activity.findOneAndUpdate(id, {
            activityName,
            pay
        })
        return res.status(200).send({
            success: true,
            message: ("Activity is modified")
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// ****BORRAMOS ACTIVIDAD*****
ActivityRouter.delete("/deleteActivity/:id",auth,authAdmin ,async (req, res) => {
    const {
        id
    } = req.params
    try {
        await Activity.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "The activity has been deleted"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****EXPORTAMOS*****
module.exports = ActivityRouter