'use strict'

const nodemailer = require('nodemailer');
require('dotenv').config();

this.send_mail = (name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PSSWD
        }
    })

    let mail_options = {
        from: 'dannyPruebas2022@gmail.com',
        to: 'dannyPruebas2022@gmail.com',
        subject: "Bienvenido a la aplicación",
        html: `
        <p>Hola Mundo ${name}"</p>
        `
    };
    
    transporter.sendMail(mail_options, (err, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envió correctamente' + info.response)
        }

    });
};

module.export = this;