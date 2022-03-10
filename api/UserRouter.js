// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const welcomeEmail = require("../templates/WelcomeEmail")
const modifyEmail = require("../templates/ModifyEmail")

// *****VISUALIZAMOS TODOS LOS DATOS*****
UserRouter.get("/users", auth, authAdmin, async (req, res) => {
    try {
        let users = await User.find({})
        if (!users) {
            res.json({
                success: false,
                message: "La lista de usuarios está vacía"
            })
        }

        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})


// *****VISUALIZAMOS DATOS DE UN SOLO USUARIO*****
UserRouter.get("/findUser/:userId", auth, authAdmin, async (req, res) => {

    const {
        userId
    } = req.params
    try {
        let user = await User.findById(id)
        if (!user) {
            res.json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Usuario Encontrado!!!",
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})

// *****VISUALIZAMOS DATOS PROPIOS*****
UserRouter.get("/findUser", auth, async (req, res) => {

    const {
        id
    } = req.user // Nos reconoce el usuario mediante el Tokken (auth.js)
    try {
        let user = await User.findById(id)
        if (!user) {
            res.json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Usuario Encontrado!!!",
            user
        })
    } catch (error) {
        res.json({
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
            return res.status(400).json({
                success: false,
                message: "El Usuario ya está registrado"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "El Password debe contener 6 dígitos o más"
            })
        }

        if (name.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Nombre Inválido"
            })
        }

        if (surname.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Apellido Inválido"
            })
        }

        if (!name || !surname || !city || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Debes completar todos los campos"
            })
        }

        re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if (!re.exec(email)) {
            return res.status(400).json({
                success: false,
                message: "El formato de Email no es correcto"
            })
        }

        // *****Aqui le damos la encriptación a la contraseña*****
        let passwordHash = bcrypt.hashSync(password, 10)

        welcomeEmail.sendWelcomeEmail(
            email,
            password, // se llama la función despues de hashear la contraseña y antes de crear el usuario
            name
        )

        let user = new User({
            name,
            surname,
            city,
            email,
            password: passwordHash
        })

        // *****Confirmación guardado*****

        await user.save();

        return res.json({
            success: true,
            status: (200),
            message: (`El usuario ${name} ${surname} está añadido`),
            user
        });



    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

// ****MODIFICAR DATOS*****
UserRouter.put("/updateUser", auth, async (req, res) => {

    const {
        id
    } = req.user // Nos reconoce el usuario mediante el Tokken (auth.js)

    const {
        name,
        surname,
        city,
        password,
        role
    } = req.body


    console.log(email)

    try {
        if (password.length < 6) {
            return res.json({
                success: false,
                message: "El Password debe contener 6 dígitos o más"
            })
        }

        if (name.length < 3) {
            return res.json({
                success: false,
                message: "Nombre inválido"
            })
        }

        if (surname.length < 2) {
            return res.json({
                success: false,
                message: "Apellido inválido"
            })
        }
        if (!role == 0 || !role == 1) {
            return res.json({
                success: false,
                message: "Role inválido"
            })
        }
        

        let passwordHash = bcrypt.hashSync(password, 10)

        modifyEmail.sendModifyEmail(
            email,
            name,
            surname,
            password
        )

        await User.findByIdAndUpdate(id, {
            name,
            surname,
            city,
            password: passwordHash,
            role
        })
        return res.status(200).json({
            success: true,
            message: (`Los Datos del usuario ${name} ${surname} han sido modificados`)
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

// ****BORRAMOS DATOS*****
UserRouter.delete("/deleteUser", auth, async (req, res) => {

    const {
        id
    } = req.user // Nos reconoce el usuario mediante el Tokken (auth.js)

    try {
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "El Usuario ha sido borrado"
        })

    } catch (error) {
        return res.status(500).json({
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
            return res.json({
                success: false,
                message: "No has completado todos los campos"
            })
        }

        if (!user) {
            return res.json({
                success: false,
                message: "El Usuario no está registrado"
            })
        }

        re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if (!re.exec(email)) {
            return res.json({
                success: false,
                message: "El formato del Email no es correcto"
            })
        }

        if (password.length < 6) {
            return res.json({
                success: false,
                message: "El Password debe contener 6 dígitos o más"
            })
        }

        let passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
            return res.json({
                success: false,
                message: "Password Incorrecto"
            })
        }
        
        const name = user.name
        const role = user.role
        const token = accessToken({
            id: user._id
        })

        return res.status(200).json({
            success: true,
            message: "Usuario Logueado correctamente",
            role,
            token,
            name
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})

const accessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    })
}

// *****EXPORTAMOS*****
module.exports = UserRouter