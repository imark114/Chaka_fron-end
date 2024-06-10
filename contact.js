const handleSubmitMessage = (event)=>{
    event.preventDefault();
    const full_name = document.getElementById("full_name").value;
    const email_address = document.getElementById("contact_email").value;
    const text = document.getElementById("message").value;
    const info = {
        full_name,
        email_address,
        text,
    }
    fetch("https://chaka-back-end.onrender.com/account/contact/",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
}