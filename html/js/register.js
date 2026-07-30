// ===============================
// AUTO FILL REFERRAL CODE
// ===============================
// ===============================
// AUTO FILL REFERRAL CODE
// ===============================

const params = new URLSearchParams(window.location.search);

const referralCode = params.get("ref");

const referralInput =
document.getElementById("referral");

if(referralCode){

    referralInput.value = referralCode;
    referralInput.classList.add("filled");
    referralInput.dispatchEvent(new Event("input"));

    referralInput.readOnly = true;

}

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.onclick = () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }else{

        passwordInput.type = "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    passwordInput.focus();

};

document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const password = document.getElementById("password").value;

    const referral = document.getElementById("referral").value.trim();

    const response = await fetch(
        "https://businessserver-7x7f.onrender.com/api/user/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullname,
                email,
                phone,
                password,
                referral
            })
        }
    );

    const data = await response.json();

    if (!data.success) {

        alert(data.message);

        return;

    }

    // Save the newly created user
    localStorage.setItem("userId", data.userId);
          

    // Go directly to Membership
    window.location.href = "membership.html";


});