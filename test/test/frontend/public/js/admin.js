//display and close functions
function display(id /*id of element to display*/){
    const element = document.getElementById(id);
    element.style.display = "block";
};
function Close(id1 /*id of element to close*/){
    const element1 = document.getElementById(id1);
    element1.style.display="none";
}




//form function for adding new products
function addNewProduct(){
    const addProduct = document.getElementById("addProduct");

    //listens for submit befor executing function
    addProduct.addEventListener("submit", (event) => {
        event.preventDefault();
        //extracts form data
        let url = "https://";
        const formData = {
            productName: addProduct.productName.value,
            productCategory: addProduct.productCategory.value,
            productDescription: addProduct.productDescription.value,
            productPrice: addProduct.productPrice.value,
            productImageUrl: url,
        };

        console.log(JSON.stringify(formData));
        
        fetch("/addProduct", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.res)
        })
        .catch(err => {
            alert(err)
        })
    })
}
addNewProduct();



//form function for adding new services
function addNewService(){
    const addService = document.getElementById("addService");

    //listens for submit befor executing function
    addService.addEventListener("submit", (event) => {
        event.preventDefault();
        //extracts form data
        let url = "https://";
        const formData = {
            serviceName: addService.serviceName.value,
            serviceDescription: addService.serviceDescription.value,
            serviceImageUrl: url,
        };

        console.log(JSON.stringify(formData));
        
        fetch("/addService", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.res)
        })
        .catch(err => {
            alert(err)
        })
    })
}
addNewService();