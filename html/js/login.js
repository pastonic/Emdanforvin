document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;
   
    try {

        const response = await fetch(
            "https://businessserver-7x7f.onrender.com/api/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        localStorage.setItem("userId", data.user.id);

        localStorage.setItem("fullname", data.user.fullname);

        localStorage.setItem("status", data.user.status);

       if (data.user.status === "Active") {

    window.location.href = "dashboard.html";

}
else if (data.user.status === "Inactive") {

    alert("Your account has been deactivated. Please contact the administrator.");

}
else {

    window.location.href = "membership.html";

}

    } catch (err) {

        console.log(err);

        alert("Unable to connect to the server.");

    }

});
 const password =
document.getElementById("password");

const toggle =
document.getElementById("togglePassword");

toggle.onclick = ()=>{

if(password.type==="password"){

password.type="text";

toggle.innerHTML=
'<i class="fa-solid fa-eye-slash"></i>';

}else{

password.type="password";

toggle.innerHTML=
'<i class="fa-solid fa-eye"></i>';

}

};
