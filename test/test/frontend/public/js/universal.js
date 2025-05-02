//naviagtion display fuction
let displayStatus = false;
const nav = document.getElementById("nav");

function displayNavigation() {
    if(displayStatus == false){
        nav.style.display = "block";
        displayStatus = true;
    } else{
        nav.style.display = "none";
        displayStatus = false
    }
}


//creates a unique identifier for user
function createUniqueIdentifier() {
    let uuid = localStorage.getItem("uuid")
    if(!uuid){
        uuid = crypto.randomUUID();
        localStorage.setItem("uuid", uuid);
    }
    return uuid;
}


//adds item to cart
const head = document.getElementsByTagName("header")[0];
let timeout;
function addToCart(productId) {
    clearTimeout(timeout);
    //each time the button is clicked a head is displayed
    head.classList.add("fixed");
    
    timeout = setTimeout(() => {
        head.classList.remove("fixed");
    }, 3000);

    fetch("/addToCart", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({productId : productId, uuid: createUniqueIdentifier()})
    })
    .then(response => response.json())
    .then(data => {
        let totalNumber = 0;
        let totalPrice = 0;
        data.res.forEach(elm => {
            totalNumber += 1;
            totalPrice += parseFloat(elm.productprice);
        });

        document.getElementById("totalNum").innerText = totalNumber.toLocaleString();
        document.getElementById("totalPrice").innerText = "N" + totalPrice.toLocaleString();
    })
}


