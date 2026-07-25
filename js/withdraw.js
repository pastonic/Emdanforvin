const userId = localStorage.getItem("userId");

if (!userId) {

    window.location.href = "login.html";

}

/* ===========================
   LOAD WALLET BALANCES
=========================== */

async function loadWallet() {

    try {

        const res = await fetch(
            `https://businessserver-7x7f.onrender.com/api/profile/${userId}`
        );

        const data = await res.json();

        if (!data.success) return;

        const user = data.user;

        document.getElementById("questionWallet").innerHTML =
            "GHS " + Number(user.token_balance).toFixed(2);

        document.getElementById("referralWallet").innerHTML =
            "GHS " + Number(user.referral_balance).toFixed(2);

    }

    catch(err){

        console.log(err);

    }

}

loadWallet();

/* ===========================
   LOAD WITHDRAWAL HISTORY
=========================== */

async function loadHistory() {

    try {

        const res = await fetch(
            `https://businessserver-7x7f.onrender.com/api/withdrawals/history/${userId}`
        );

        const data = await res.json();

        const tbody =
            document.getElementById("historyBody");

        if (!data.success || data.withdrawals.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="4">
                        No withdrawal history yet.
                    </td>
                </tr>
            `;

            return;

        }

        let html = "";

        data.withdrawals.forEach(w => {

            let statusClass = "";

            if (w.status === "Pending") {

                statusClass = "status-pending";

            }

            if (w.status === "Approved") {

                statusClass = "status-approved";

            }

            if (w.status === "Rejected") {

                statusClass = "status-rejected";

            }

            html += `

            <tr>

                <td>

                    ${new Date(w.created_at).toLocaleDateString()}

                </td>

                <td>

                    ${w.type}

                </td>

                <td>

                    GHS ${Number(w.amount).toFixed(2)}

                </td>

                <td class="${statusClass}">

                    ${w.status}

                </td>

            </tr>

            `;

        });

        tbody.innerHTML = html;

    }

    catch(err){

        console.log(err);

    }

}

loadHistory();

/* ===========================
   SUBMIT WITHDRAWAL
=========================== */

document
.getElementById("withdrawForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const type =
        document.getElementById("walletType").value;

    const amount =
        Number(document.getElementById("amount").value);

    const momo_name =
        document.getElementById("momoName").value.trim();

    const momo_number =
        document.getElementById("momoNumber").value.trim();

    const network =
        document.getElementById("network").value;

    try{

        const res = await fetch(

            "https://businessserver-7x7f.onrender.com/api/withdrawals",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    userId,

                    type,

                    amount,

                    momo_name,

                    momo_number,

                    network

                })

            }

        );

        const data = await res.json();

        alert(data.message);

        if(data.success){

            document
            .getElementById("withdrawForm")
            .reset();

            loadHistory();

            loadWallet();

        }

    }

    catch(err){

        console.log(err);

        alert("Unable to submit withdrawal.");

    }

});