const mailerForm = document.getElementById("mailerForm");

mailerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(mailerForm);
    const formObject = Object.fromEntries(formData.entries());

    fetch("/sendMail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.res);
    })
    .catch(error => {
        alert("An error occurred: " + error);
    });
});