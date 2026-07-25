const userId = localStorage.getItem("userId");

if (!userId) {

    window.location.href = "login.html";

}

async function loadProfile() {

    try {

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/profile/${userId}`

        );

        const data = await res.json();

        if (!data.success) {

            alert("Unable to load profile.");

            return;

        }

        const user = data.user;

        document.getElementById("avatar").innerHTML =
            user.fullname.charAt(0).toUpperCase();

        document.getElementById("fullname").innerHTML =
            user.fullname;

        document.getElementById("status").innerHTML =
            user.status;

        document.getElementById("email").innerHTML =
            user.email;

        document.getElementById("phone").innerHTML =
            user.phone;

        document.getElementById("referralCode").innerHTML =
            user.referral_code;

        document.getElementById("questionBalance").innerHTML =
            "GHS " + Number(user.token_balance).toFixed(2);

        document.getElementById("referralBalance").innerHTML =
            "GHS " + Number(user.referral_balance).toFixed(2);

    }

    catch(err){

        console.log(err);

        alert("Server Error.");

    }

}

loadProfile();

/* ===============================
   EDIT PHONE NUMBER
================================ */

document
.getElementById("editPhoneBtn")
.addEventListener("click", async () => {

    const phone = prompt("Enter your new phone number:");

    if (!phone) return;

    const res = await fetch(

        `https://businessserver-7x7f.onrender.com/api/profile/phone/${userId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                phone

            })

        }

    );

    const data = await res.json();

    alert(data.message);

    if(data.success){

        loadProfile();

    }

});

/* ===============================
   CHANGE PASSWORD
================================ */

document
.getElementById("changePasswordBtn")
.addEventListener("click", async () => {

    const oldPassword =
        prompt("Enter your current password:");

    if (!oldPassword) return;

    const newPassword =
        prompt("Enter your new password:");

    if (!newPassword) return;

    const res = await fetch(

        `https://businessserver-7x7f.onrender.com/api/profile/password/${userId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                oldPassword,

                newPassword

            })

        }

    );

    const data = await res.json();

    alert(data.message);

});