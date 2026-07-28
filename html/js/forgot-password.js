const password =
document.getElementById("newPassword");

const toggle =
document.getElementById("togglePassword");

toggle.onclick = () => {

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

// SEND CODE

document
.getElementById("sendCodeBtn")
.onclick = async () => {

    const email =
    document.getElementById("email").value;

    const response = await fetch(

        "https://businessserver-7x7f.onrender.com/api/password/send-code",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email

            })

        }

    );

    const data =
    await response.json();

    alert(data.message);

};

// RESET PASSWORD

document
.getElementById("resetForm")
.addEventListener("submit", async(e)=>{

e.preventDefault();

const email =
document.getElementById("email").value;

const code =
document.getElementById("code").value;

const password =
document.getElementById("newPassword").value;

// Verify Code

let verify = await fetch(

"https://businessserver-7x7f.onrender.com/api/password/verify-code",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

code

})

}

);

verify = await verify.json();

if(!verify.success){

alert(verify.message);

return;

}

// Reset Password

let reset = await fetch(

"https://businessserver-7x7f.onrender.com/api/password/reset",

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

code,

password

})

}

);

reset = await reset.json();

alert(reset.message);

if(reset.success){

window.location.href="login.html";

}

});