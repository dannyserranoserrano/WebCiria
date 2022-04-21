// *****IMPORTAMOS*****
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const File = require("../models/File");
const FileRouter = express.Router();

const cloudinary = require('cloudinary')

const fs = require('fs')

// *****INTRODUCIMOS LA CONFIGURACIÓN DE CLOUDINARY*****
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// *****VISUALIZAR TODOS LOS ARCHIVOS*****
FileRouter.get("/files", async (req, res) => {
    let files = await File.find({})
    return res.status(200).json({
        success: true,
        files
    })
})

// *****VISUALIZAR UN ARCHIVO*****
FileRouter.get("/findFiles/:fileId", auth, async (req, res) => {
    const {
        fileId
    } = req.params
    try {
        let file = await File.findById(fileId).populate({
            path: "event",
            select: "name dateActivity"
        }).populate({
            path: "user",
            select: "name surname"
        })
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Archivo no encontrado"
            })
        }
        return res.status(200).json({
            success: true,
            file
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVO ARCHIVO*****
FileRouter.post("/newFile", auth, async (req, res) => {
    const {
        id
    } = req.user // Nos reconoce el usuario mediante el Tokken (auth.js)
    const {
        fileName,
        description,
        date,
        event
    } = req.body

    try { 
         if (!req.files || Object.keys(req.files.file).length === 0)
            return res.status(400).json({
                success: false,
                message: 'No has seleccionado ningun archivo'
            })

        const file = req.files.file;

        if (!fileName || !date) {
            return res.status(400).json({
                success: false,
                message: "No has completado todos los campos"
            })
        }
       
        if (file.size > 4000 * 3000) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                success: false,
                message: 'El archivo es demasiado grande'
            })
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                success: false,
                message: "Formato de archivo incorrecto."
            })
        }

        let newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "filesUpload",
        });
         removeTmp(file.tempFilePath);
         async (err, result) => {
            if (err) throw err;
            removeTmp(file.tempFilePath);
        };

        let fileImg = await File.create({
            fileName,
            description,
            date,
            image: {
                public_id: newFile.public_id,
                url: newFile.secure_url
            },
            user: id,
            event
        });

        // *****CONFIRMACION GUARDADO*****
        await fileImg.save()
        return res.status(200).json({
            success: true,
            fileImg
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// ****MODIFICAR DATOS DEL ARCHIVO*****
FileRouter.put("/updateFile/:fileId", auth, async (req, res) => {
    const {
        fileId
    } = req.params
    const {
        fileName,
        description,
        date,
    } = req.body
    try {
        await File.findByIdAndUpdate(fileId, {
            fileName,
            description,
            date
        })
        return res.status(200).json({
            success: true,
            message: ("Los datos del archivo han sido modificados")
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// ****BORRAMOS DATOS*****
FileRouter.delete("/deleteFile/:fileId", auth, authAdmin, async (req, res) => {

    try {
        const {
            fileId
        } = req.params
        const {
            public_id
        } = req.body
        if (!public_id) {
            return res.status(400).json({
                success: false,
                message: "No se han seleccionado imagenes",
            });
        }

        await File.findByIdAndDelete(fileId)
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
        });

        return res.status(200).json({
            success: true,
            message: "Archivo eliminado correctamente",
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

//*****Delete temporary files*****
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

// *****EXPORTAMOS*****
module.exports = FileRouter