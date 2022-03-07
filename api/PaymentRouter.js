// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Payment = require("../models/Payment");
const PaymentRouter = express.Router();

// *****VISUALIZAMOS TODOS LOS DATOS DE PAGO*****
PaymentRouter.get("/payments",auth,authAdmin,async (req, res) => {
    try {
        let payments = await Payment.find({})
        if (!payments) {
            res.status(400).send({
                success: false,
                message: "The list of payments is empty"
            })
        }

        return res.status(200).send({
            success: true,
            payments
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****VISUALIZAMOS LECTURA DE UN DATO DE PAGO*****
PaymentRouter.get("/findPay/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    try {
        let payment = await Payment.findById(id)
        if (!payment) {
            res.status(400).send({
                success: false,
                message: "Payment not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Payment found",
            payment
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVO PAGO****
PaymentRouter.post("/newPay",auth,async (req, res) => {
    const {
        paymentId,
        paySystem
    } = req.body
    try {
        let payment = new Payment({
            user: userId,
            paySystem
        })

        // *****CREAMOS ERRORES*****
        if (userId.length < 3) {
            return res.status(400).send({
                success: false,
                message: "Enter a valid User"
            })
        }
        if (!userId || !paySystem) {
            return res.status(400).send({
                success: false,
                message: "Enter all fields"
            })
        }
        // *****CONFIRMACION GUARDADO*****
        await payment.save()
        return res.status(200).send({
            success: true,
            message: ("Has been added successfully"),
            payment
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// ****MODIFICAR DATOS*****
PaymentRouter.put("/updatePay/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    const {
        paySystem
    } = req.body
    try {
        await Payment.findOneAndUpdate(id, {
            paySystem
        })
        return res.status(200).send({
            success: true,
            message: ("User data is modified")
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// ****BORRAMOS DATOS*****
PaymentRouter.delete("/deletePay/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    try {
        await Payment.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "The payment system has been deleted"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// *****EXPORTAMOS*****
module.exports = PaymentRouter