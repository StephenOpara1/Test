const express = require("express");
const router = express.Router();
const pool = require("../utils/pg");


//admin adding new services
router.post("/addService", async (req, res) => {
    let {serviceName, serviceDescription, serviceImageUrl} = req.body;

    const query = `INSERT INTO services (servicename, servicedescription, serviceimageurl)
    VALUES ($1, $2, $3)
    `;
    try {
        //adds product data to product table
        await pool.query(query, [serviceName, serviceDescription, serviceImageUrl]);
        res.status(200).json({res:'service added successfully'})
    } catch (error) {
        console.log(error);
        res.status(400).json({res:'Try again after checking inputs.'})
    }
});



//user getting services
router.get("/getServices", async (req, res) => {
    const query = `SELECT * FROM services`;

    try {
        const result = await pool.query(query);
        res.status(200).json({res: result.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({err: "An internal server error occurred"})
    }
})


module.exports = router;