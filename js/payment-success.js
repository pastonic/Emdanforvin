const params = new URLSearchParams(window.location.search);

const reference = params.get("reference");
const userId = params.get("userId");

fetch(`https://businessserver-7x7f.onrender.com/api/payment/verify/${reference}?userId=${userId}`)
.then(res => res.json())
.then(async (data) => {

    if(data.success){

        // Reward the referrer if there is one
        await fetch(
            "https://businessserver-7x7f.onrender.com/api/referrals/reward",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId
                })
            }
        );

        // Save logged in user
        localStorage.setItem("userId", userId);

        alert("Membership Activated Successfully!");

        window.location.href = "dashboard.html";

    }else{

        alert(data.message);

    }

})
.catch(err=>{

    console.log(err);

    alert("Payment verification failed.");

});