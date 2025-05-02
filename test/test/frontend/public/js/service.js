//gets all services from backend and displays them on frontend
function getServices(){
    const serviceList = document.getElementById("serviceList");

    fetch("/getServices", {
        method: "get"
    })
    .then(response => response.json())
    .then(data => {
        data.res.forEach(element => {
            serviceList.innerHTML += `<div>
            <img src=${element.serviceimageurl}/>
            <div>
                <h1>${element.servicename}</h1>
                <p>
                    ${element.servicedescription}
                </p><br>
                <a href="/book">BOOK AN APPOINTMENT</a>
            </div>
        </div>`
        });
        
    })
}
getServices();