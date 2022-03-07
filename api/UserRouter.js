// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const mailer = require('../templates/registro-template')

// *****VISUALIZAMOS TODOS LOS DATOS*****
UserRouter.get("/users", auth, authAdmin, async (req, res) => {
    try {
        let users = await User.find({})
        if (!users) {
            res.status(400).send({
                success: false,
                message: "The user list is empty"
            })
        }

        return res.status(200).send({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****VISUALIZAMOS DATOS DE UN SOLO USUARIO*****
UserRouter.get("/findUser/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        let user = await User.findById(id).populate({
            path: "name",
            select: "name surname city email"
        })
        if (!user) {
            res.status(400).send({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User found",
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVO USUARIO*****
UserRouter.post("/newUser", async (req, res) => {
    const {
        name,
        surname,
        city,
        email,
        password
    } = req.body
    try {
        // *****CREAMOS ERRORES*****
        let userFind = await User.findOne({
            email
        })
        if (userFind) {
            return res.status(400).send({
                success: false,
                message: "This user is already registered"
            })
        }
        if (password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "The password must contin 6 digits o more"
            })
        }

        if (name.length < 3) {
            return res.status(400).send({
                success: false,
                message: "Invalid Name"
            })
        }

        if (surname.length < 2) {
            return res.status(400).send({
                success: false,
                message: "Invalid Surname"
            })
        }

        if (!name || !surname || !city || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "You have not completed all the fields"
            })
        }
        // *****AQUI LE DAMOS LA ENCRIPTACIÓN A LA CONTRASEÑA*****
        let passwordHash = bcrypt.hashSync(password, 10)
        let user = new User({
            name,
            surname,
            city,
            email,
            password: passwordHash
        })

        // *****CONFIRMACION GUARDADO*****

        await user.save();
        // mailer.send_mail(user.name);

        return res.status(200).send({
            success: true,
            message: (`El usuario ${name} ${surname} está añadido`),
            user
        });



    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// ****MODIFICAR DATOS*****
UserRouter.put("/updateUser/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    const {
        name,
        surname,
        city,
        password
    } = req.body
    try {

        if (password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "The password must contin 6 digits o more"
            })
        }

        if (name.length < 3) {
            return res.status(400).send({
                success: false,
                message: "Invalid Name"
            })
        }

        if (surname.length < 2) {
            return res.status(400).send({
                success: false,
                message: "Invalid Surname"
            })
        }

        let passwordHash = bcrypt.hashSync(password, 10)
        await User.findOneAndUpdate(id, {
            name,
            surname,
            city,
            password: passwordHash
        })
        return res.status(200).send({
            success: true,
            message: (`${name} ${surname} user data is modified`)
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// ****BORRAMOS DATOS*****
UserRouter.delete("/deleteUser/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        await User.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "The user has been deleted"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****FUNCION PARA LOGUEARSE*****
UserRouter.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "You have not completed all the fields"
            })
        }

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "The User is not registered"
            })
        }


        let passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
            return res.status(400).send({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = accessToken({
            id: user._id
        })

        return res.status(200).send({
            success: true,
            message: "User Logged in successfully",
            token
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

const accessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

// *****EXPORTAMOS*****
module.exports = UserRouter