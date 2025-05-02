//listens for change in selection classifiction
let firstRun = true;
function getProducts() {
    const sort = document.getElementById("sort");
    const productList = document.getElementById("productList");
    if(firstRun){
        firstRun = false;
        getProducts();
        fetch("/getProduct", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({sort: sort.options[sort.selectedIndex].value})
        })
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = ""
            data.res.forEach(element => {
                productList.innerHTML += `
                <div>
                    <a href = "/viewProduct/${element.id}"><img/ src=${element.productimageurl}></a><br>
                    <span>${element.productcategory}</span>
                    <h3>${element.productname}</h3>
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><br><br>
                    <span style="font-size:.9rem">N${element.productprice}</span><br>
                    <b><a onclick = "addToCart(${element.id})">ADD TO CART<a></b>
                </div>`
            });
        })
    }else{
        sort.addEventListener("change", () => {
            fetch("/getProduct", {
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({sort: sort.options[sort.selectedIndex].value})
            })
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = ""
                data.res.forEach(element => {
                    productList.innerHTML += `
                    <div>
                        <a><img href = "/viewProduct/${element.id} src=${element.productimageurl}/></a><br>
                        <span>${element.productcategory}</span>
                        <h3>${element.productname}</h3>
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><br><br>
                        <span style="font-size:.9rem">N${element.productprice}</span><br>
                        <b><a onclick = "addToCart(${element.id})">ADD TO CART<a></b>
                    </div>`
                });
            })
        })
    } 
}

getProducts();