const express = require("express");
const path = require("path");
const pool = require("../utils/pg");
const router = express.Router();



//registers user's ip address to and creates a database for user to store shopping information
router.post("/addToCart", async (req, res) => {
    const {productId, uuid} = req.body;
    
    try {
        //check existense of uuid query
        const uuidExistenceQuery = `SELECT EXISTS(SELECT 1 FROM usercart WHERE uuid = $1)`;
        const identifier = [uuid];
        const uuidRes = await pool.query(uuidExistenceQuery, identifier);

        //if false add uuid to database
        if(uuidRes.rows[0].exists === false){
            const addUuidQuery = `INSERT INTO usercart (uuid, items) VALUES ($1, $2::jsonb)`;
            await pool.query(addUuidQuery, [uuid, JSON.stringify([])])
        }

        //if uuid already exists simply add new item to cart
        //first we get item info from product id
        const getProductQuery = `SELECT productname, productprice, id FROM Products WHERE id = $1`;
        const getUserItemsQuery = `SELECT items FROM usercart WHERE uuid = $1`;
        const productRes = await pool.query(getProductQuery, [productId]);
        const itemRes = await pool.query(getUserItemsQuery, [uuid]);

        //adds new product id to json
        let itemsJson = itemRes.rows[0].items;
        itemsJson.push(productRes.rows[0]);//updates items json

        //pushes update to database
        await pool.query(`UPDATE usercart SET items = $1 WHERE uuid = $2`, [JSON.stringify(itemsJson), uuid]);

        res.status(200).json({res: itemsJson});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error : "An Internal server error occurred"});
    }
});



router.get("/viewProduct/:id", async (req, res) => {
    const productId = req.params.id;
    
    //gets product information from database
    const query = `SELECT * FROM Products WHERE id = $1`;
    try {
        const result = await pool.query(query, [productId]);
        
        //renders data on ejs file
        res.render("view-product", {
            name: result.rows[0].productname,
            description: result.rows[0].productdescription,
            category: result.rows[0].productcategory,
            price: result.rows[0].productprice,
            id: result.rows[0].id,
            imageurl: result.rows[0].productimageurl,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send("An internal server error occurred");
    }
})




router.post("/getAllItems", async (req, res) => {
    const {uuid} = req.body;
    try {
        const getUserItemsQuery = `SELECT items FROM usercart WHERE uuid = $1`;
        const itemRes = await pool.query(getUserItemsQuery, [uuid]);

        res.status(200).json({res: itemRes.rows[0]});
        
    } catch (error) {
        res.status(400).json({err: "an internal server error occurred"})
    }
})


module.exports = router