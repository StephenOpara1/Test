const express = require("express");
const router = express.Router();
const validator = require("validator");
const pool = require("../utils/pg");



router.post("/addProduct", async (req, res) => {
    let {productName, productDescription, productImageUrl, productPrice, productCategory} = req.body;

    const query = `INSERT INTO Products (productname, productprice, productcategory, productdescription, productimageurl, productsales)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
        //adds product data to product table
        await pool.query(query, [productName, productPrice, productCategory, productDescription, productImageUrl, 0]);
        res.status(200).json({res:'Product added successfully'})
    } catch (error) {
        console.log(error);
        res.status(400).json({res:'Try again after checking inputs.'})
    }
});



router.post("/getProduct", async (req, res) => {
    let {sort} = req.body;
    sort = validator.escape(sort);//sanitizes text

    let query;
    try {
        if(sort === "pricel"){
            query = `SELECT * FROM Products ORDER BY productprice::numeric`;
        }else if(sort === "priceh"){
            query = `SELECT * FROM Products ORDER BY productprice::numeric DESC`
        }else if(sort === "popularity"){
            query = `SELECT * FROM Products ORDER BY productsales::numeric DESC`
        }else if(sort === "latest"){
            query = `SELECT * FROM Products ORDER BY created_at DESC`
        }else if(sort === "rating"){
            query = `SELECT * FROM Products ORDER BY productrating::numeric DESC`
        }else{
            res.status(405).json({err: "sorting not found"})
        }

        const result = await pool.query(query);
        
        res.status(200).json({res: result.rows});
    } catch (error) {
        console.log(error);
        res.status(405).json({err: "An internal server error occurred"});
    }
})

module.exports = router;