//required modules
const express = require("express");
const path = require("path")



//initialize express
app = express();

app.set('views', path.join(__dirname, '../frontend/public/views')); //serts view engine for
app.set("view engine", 'ejs');

//express middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));



//website's major get requests
app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/home.html'))
});
app.get("/about", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/about.html'))
});
app.get("/services", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/services.html'))
});
app.get("/shop", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/shop.html'))
});
app.get("/book", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/booking.html'))
});
app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/contact.html'))
});
app.get("/login126dD", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/login.html'))
});
app.get("/payment", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/payment.html'))
})



//post requests
app.use("/", require("./src/route/mailer")); //mailer route
app.use("/", require("./src/route/login-auth")); //admin login authentication
app.use("/", require("./src/route/product-route")); //products route
app.use("/", require("./src/route/service-route")); //services route
app.use("/", require("./src/route/cart")); //cart route
app.use("/", require("./src/route/book")); //book route


//db creation
require("./src/database/tables");

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port} and listening for requests.......`)
});