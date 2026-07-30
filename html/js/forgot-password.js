const password =
document.getElementById("newPassword");

const confirmPassword =
document.getElementById("confirmPassword");

const togglePassword =
document.getElementById("togglePassword");

const toggleConfirm =
document.getElementById("toggleConfirm");

/* ==========================
PASSWORD EYE
========================== */

togglePassword.onclick = () => {

    if(password.type === "password"){

        // Show password

        password.type = "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }else{

        // Hide password

        password.type = "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    password.focus();

};
toggleConfirm.onclick = () => {

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";

        toggleConfirm.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }else{

        confirmPassword.type = "password";

        toggleConfirm.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    confirmPassword.focus();

};
/* ==========================
RESET PASSWORD
========================== */

document
.getElementById("resetForm")
.addEventListener("submit", async(e)=>{

e.preventDefault();

const fullname =
document.getElementById("fullname").value.trim();

const email =
document.getElementById("email").value.trim();

const phone =
document.getElementById("phone").value.trim();

const newPassword =
document.getElementById("newPassword").value;

const confirm =
document.getElementById("confirmPassword").value;

if(newPassword!==confirm){

alert("Passwords do not match.");

return;

}

const response =
await fetch(

"https://businessserver-7x7f.onrender.com/api/password/reset",

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

fullname,

email,

phone,

password:newPassword

})

}

);

const data =
await response.json();

alert(data.message);

if(data.success){

window.location.href="login.html";

}

});