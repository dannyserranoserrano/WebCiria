// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Reserve = require("../models/Reserve");
const Event = require("../models/Event");
const ReserveRouter = express.Router();

// *****VISUALIZAMOS TODAS LAS RESERVAS*****
ReserveRouter.get("/reserves",auth,authAdmin,async (req, res) => {
    try {
        let reserves = await Reserve.find({}).populate({path:"participating", select:"name surname"}).populate({path:"event", select:"description dateActivity"})
        if (!reserves) {
            res.status(400).send({
                success: false,
                message: "The list of reserves is empty"
            })
        }

        return res.status(200).send({
            success: true,
            reserves
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****VISUALIZAMOS SOLO UNA RESERVA*****
ReserveRouter.get("/findReserve/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    try {
        let reserve = await Reserve.findById(id).populate({path:"participating", select:"name surname"}).populate({path:"event", select:"description dateActivity"})
        if (!reserve) {
            res.status(400).send({
                success: false,
                message: "Reserve not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Reserve found",
            reserve
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// *****CREAMOS UNA RESERVA PARA EL EVENTO*****
//**El usuario lo coge directamente por el tokken con req.user, y le metemos el id del evento al que nos inscribimos por parametros**
ReserveRouter.post("/newReserve/:eventId",auth,async (req, res) => {
    const {
       id
    } = req.user
    const {eventId} = req.params
    try {
        let findEvent = await Event.findById(eventId)
        if (!findEvent) {
            return res.status(400).send({
                success: false,
                message: "This event does not exist"
            })
        }

        let newReserve = new Reserve({
            event: eventId,
            participating:id
        })

console.log(id)
        let findUser = await findEvent.participating.find(user => user._id.equals(id))

        if(findUser){
            return res.status(400).send({
                success: false,
                message: "You are already registered in this event"
            })
        }

        await Event.findByIdAndUpdate(eventId, {
            $push: { participating:id},
          });

        await newReserve.save()

        return res.status(200).send({
            success: true,
            message: "Reservation created",
            newReserve
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// *****AÑADIMOS PARTICIPANTES A UNA RESERVA*****
ReserveRouter.put("/updateReserve/:id",auth,async (req, res) => {
    // *****Añadimos Id de la reserva*****
    const {
        id
    } = req.params
    // *****Añadimos Id del nuevo participante*****
    const {
        participatingId,
    } = req.body

    try {
        let reserve = await Reserve.findById(id);
        // *****Buscamos errores*****
        if (!reserve) {
            return res.status(400).send({
                success: false,
                message: "Esta reserva no existe"
            })
        };

 
// *****Añade el nuevo participante*****
        reserve = await Reserve.findByIdAndUpdate(
            id, {
                $push: {
                    participating: participatingId,
                }
            }, {
                new: true,
            }
        );
        res.status(200).send({
            success: true,
            message: "Participant added to the reservation",
            reserve
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// ****BORRAMOS RESERVA*****
ReserveRouter.delete("/deleteReserve/:id",auth,authAdmin,async (req, res) => {
    const {
        id
    } = req.params
    try {
        await Reserve.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "The reserve has been deleted"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****EXPORTAMOS*****
module.exports = ReserveRouter