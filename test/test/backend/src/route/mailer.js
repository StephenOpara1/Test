const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();



//node mailer transporter setup
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "rfcowebsite@gmail.com",
        pass: process.env.APP_PASSWORD
    }
});


router.post("/sendMail", async (req, res) => {
    let {email, name, number, message} = req.body;//exctract data
    
    try {
        //mail info
        const mailOptions = {
            from:"rfcowebsite@gmail.com",
            to: "stephenopara405@gmail.com",
            subject: "You have received a new email from a user of aestheticsbylozik",
            html:`
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${number}</p>
                <hr>
                <p>Message:<br> ${message}</p>
            `
        };

        const userResponse = {
            from:"rfcowebsite@gmail.com",
            to: email,
            subject: "You have received an email from aestheticsbylozik",
            html:`
                <p>Thank you for contacting Aestheticsbylozic, we will be in touch with you soon!</p>
            `
        }

        //sends the email
        await transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                res.status(500).json({res: "An error occured! Try again!"});
            } else{
                res.status(200).json({res: "Email sent to AestheticByLozik successfullly"});
            }
        })


        await transporter.sendMail(userResponse, (error, info) => {
            if(error){
                
            }
        })
    } catch (error) {
        res.status(500).json({res: "An error occured! Try again!"});
        console.log(error);
    }
});



module.exports = router