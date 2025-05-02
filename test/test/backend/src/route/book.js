const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.MAIL_ADDRESS,
        pass: process.env.APP_PASSWORD
    }
})


router.post("/bookAppointment", async (req, res) => {
    const {name, time, email, service, number, location} = req.body;

    try {
        const toLozik = {
            from:"rfcowebsite@gmail.com",
            to: "stephenopara405@gmail.com",
            subject: "A User booked an appointment",
            html:`
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${number}</p>
                <hr>
                <p>Location:<br> ${location}</p>
                <p>Service:<br> ${service}</p>
                <p>Time:<br> ${time}</p>
            `} 


        const toUser = {
            from:"rfcowebsite@gmail.com",
            to: `${email}`,
            subject: "Thanks for choosing AestheticByLoozik",
            html:`
                <p>Our employees will bee in toouch with you shortly..... Thanks for choosing us</p>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${number}</p>
                <hr>
                <p>Location:<br> ${location}</p>
                <p>Service:<br> ${service}</p>
                <p>Time:<br> ${time}</p>`
            }


        await transporter.sendMail(toLozik, (error, info) => {
            if(error){
                
            } else{
                res.status(200).json({res: "Appointment Booked successfully"});
            }
        })

        await transporter.sendMail(toUser, (error, info) => {
            if(error){
                
            }
        })

    } catch (error) {
        res.status(400).json({res: "An internal server error occurred"});
    }
    
})



module.exports = router