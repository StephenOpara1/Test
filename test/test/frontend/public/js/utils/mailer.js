const mailerForm = document.getElementById("mailerForm");

mailerForm.addEventListener("submit", (event) => {
    event.preventDefault(); //prevents default form behaviour

    const formData = new FormData(mailerForm)

    fetch("/sendMail", {
        method : "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.res)
    })
    .catch(error => {
        alert(error)
    })
})