//creates database tables for products and service information


const pool = require('../utils/pg');

const createproducttable = `
CREATE TABLE IF NOT EXISTS products (
id SERIAL PRIMARY KEY,
productname VARCHAR(225),
productprice VARCHAR(225),
productdescription VARCHAR(1005),
productimageurl VARCHAR(1000),
productcategory VARCHAR(225),
productsales VARCHAR(2255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

//creates the table in database
async function createProductsTable() {
    try {
        await pool.query(createproducttable);
        console.log('Products table created Successfully');
    } catch (error) {
        console.log(error)
    }
};

createProductsTable();





const createservicetable = `
CREATE TABLE IF NOT EXISTS services (
id SERIAL PRIMARY KEY,
servicename VARCHAR(225),
servicedescription VARCHAR(1005),
serviceimageurl VARCHAR(1000)
);
`;

//creates the table in database
async function createServicesTable() {
    try {
        await pool.query(createservicetable);
        console.log('Services table created Successfully');
    } catch (error) {
        console.log(error)
    }
};

createServicesTable();



//user cart data
const createusercart = `
CREATE TABLE IF NOT EXISTS usercart (
uuid TEXT,
items JSONB
);
`;

//creates the table in database
async function createUserCart() {
    try {
        await pool.query(createusercart);
        console.log('Cart table created Successfully');
    } catch (error) {
        console.log(error)
    }
};

createUserCart();


module.exports =  {createProductsTable, createServicesTable, createUserCart}