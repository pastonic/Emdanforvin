const userId = localStorage.getItem("userId");

async function loadProfile(){

    const res = await fetch(

        `https://businessserver-7x7f.onrender.com/api/profile/${userId}`

    );

    const user = await res.json();

    document.getElementById("fullname").innerHTML =
        user.fullname;

    document.getElementById("status").innerHTML =
        user.status;

    document.getElementById("referralCode").innerHTML =
        user.referral_code;

    document.getElementById("questionBalance").innerHTML =
        "₵" + Number(user.token_balance).toFixed(2);

    document.getElementById("referralBalance").innerHTML =
        "₵" + Number(user.referral_balance).toFixed(2);

}

loadProfile();








































