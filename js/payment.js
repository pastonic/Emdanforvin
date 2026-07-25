const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async () => {

    const email = localStorage.getItem("email");

    const response = await fetch(
        "https://businessserver-7x7f.onrender.com/api/payment/initialize",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        }
    );

    const data = await response.json();

    if (!data.status) {
        alert("Unable to initialize payment.");
        return;
    }

    let handler = PaystackPop.setup({

        key: "pk_test_YOUR_PUBLIC_KEY",

        email: email,

        amount: 3000,

        ref: data.data.reference,

        callback: function () {

            alert("Payment Successful");

            window.location = "dashboard.html";

        },

        onClose: function () {

            alert("Payment Cancelled");

        }

    });

    handler.openIframe();

});