const express = require("express");
const validator = require("validator");
const path = require("path");
const router = express.Router();

router.post("/admin157F", async (req, res) => {
    let { password }  = req.body;
    
    try {
        //checks if password is correct before sending page
        if(password == "hhhh"){
            res.sendFile(path.resolve(__dirname, '../../../frontend/pages/admin.html'))
        } else{
            res.status(200).json({res:"Incorrect password"})
        }
    } catch (error) {
        res.status(200).json({res:"An internal server error occurred! Try Again!"})
        console.log(error)
    }
})


module.exports = router;