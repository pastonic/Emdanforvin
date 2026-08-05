const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async () => {

   const userId = localStorage.getItem("userId");

    const response = await fetch(
        "https://businessserver-7x7f.onrender.com/api/payment/initialize",
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

    const data = await response.json();

    if (!data.status) {
        alert("Unable to initialize payment.");
        return;
    }

    let handler = PaystackPop.setup({

        key: "pk_live_e9fda60773861653aef6a8b7fa6f75718c483298",

        email: email,

        amount: 3000,

        ref: data.data.reference,

        callback: function (response) {

    window.location =
    `payment-success.html?reference=${response.reference}&userId=${userId}`;

},

        onClose: function () {

            alert("Payment Cancelled");

        }

    });

    handler.openIframe();

});