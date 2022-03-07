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
    return res.status(200).send({
        success: true,
        files
    })
})

// *****VISUALIZAR UN ARCHIVO*****
FileRouter.get("/findFiles/:id", async (req, res) => {
    const {
        id
    } = req.params
    try {
        let file = await File.findById(id)
        if (!file) {
            res.status(400).send({
                success: false,
                message: "File not found"
            })
        }
        return res.status(200).send({
            success: true,
            file
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// *****CREAMOS NUEVO ARCHIVO*****
FileRouter.post("/newFile",auth,async (req, res) => {
    const {
        fileName,
        description,
        date,
        user,
        event
    } = req.body

    try {
        if (!fileName || !date || !user) {
            return res.status(400).send({
                success: false,
                message: "You have not completed all the required fields"
            })
        }
    

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({
                msg: 'No files were uploaded.'
            })

        const file = req.files.file;
        console.log(file)

        if (file.size > 4000 * 3000) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                msg: 'Size too large'
            })
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)

            return res.status(400).json({
                msg: "File format is incorrect."
            })
        }
        let newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "filesUpload"
        }, async (err, result) => {
            if (err) throw err;
            removeTmp(file.tempFilePath)
        })

        let fileImg = new File({
            fileName,
            description,
            date,
            image: {
                public_id: newFile.public_id,
                url: newFile.secure_url
            },
            user,
            event
        })

        // *****CONFIRMACION GUARDADO*****
        await fileImg.save()
        return res.status(200).send({
            success: true,
            fileImg
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// ****MODIFICAR DATOS DEL ARCHIVO*****
FileRouter.put("/updateFile/:id",auth,async (req, res) => {
    const {
        id
    } = req.params
    const {
        fileName,
        description,
        date,
    } = req.body
    try {
        await File.findOneAndUpdate(id, {
            fileName,
            description,
            date
        })
        return res.status(200).send({
            success: true,
            message: ("The File Data is Modified")
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// ****BORRAMOS DATOS*****
FileRouter.delete("/deleteFile/:id",auth,authAdmin,async (req, res) => {

try {
    const{id} = req.params
    const{public_id} = req.body
    if (!public_id) {
        return res.status(400).json({
          success: false,
          message: "No se han seleccionado imagenes",
        });
      }
    await File.findByIdAndDelete(id)
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;
      });
  
      res.json({
        success: true,
        message: "Archivo eliminado correctamente",
      });


    } catch (error) {
        return res.status(500).send({
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