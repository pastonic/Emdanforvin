const userId = localStorage.getItem("userId");

document.getElementById("payBtn").onclick = async () => {

    const response = await fetch(
        "https://businessserver-7x7f.onrender.com/api/payment/initialize",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userId
            })
        }
    );

    const data = await response.json();

    if(data.status){

        window.location.href = data.data.authorization_url;

    }else{

        alert("Unable to initialize payment.");

    }

};