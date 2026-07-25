const userId = localStorage.getItem("userId");

if (!userId) {

    window.location.href = "login.html";

}

// ===============================
// LOAD WALLET
// ===============================

async function loadWallet() {

    try {

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/wallet/${userId}`

        );

        const data = await res.json();

        if (!data.success) {

            alert("Unable to load wallet.");

            return;

        }

        document.getElementById("questionWallet").innerText =
            "GHS " + Number(data.questionWallet).toFixed(2);

        document.getElementById("referralWallet").innerText =
            "GHS " + Number(data.referralWallet).toFixed(2);

        document.getElementById("totalBalance").innerText =
            "GHS " + Number(data.total).toFixed(2);

    }

    catch(err){

        console.log(err);

    }

}

// ===============================
// LOAD TRANSACTIONS
// ===============================

async function loadTransactions(){

    try{

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/activity/${userId}`

        );

        const data = await res.json();

        const list =
            document.getElementById("transactionList");

        if(!data.success || data.activities.length===0){

            list.innerHTML = `

                <p>No transactions yet.</p>

            `;

            return;

        }

        let html = "";

        data.activities.forEach(activity=>{

            html += `

            <div class="transaction">

                <div>

                    <div class="transaction-title">

                        ${activity.title}

                    </div>

                    <div class="transaction-date">

                        ${new Date(activity.created_at).toLocaleDateString()}

                    </div>

                </div>

                <div class="amount">

                    ${Number(activity.amount)>=0?"+":"-"}GHS ${Math.abs(Number(activity.amount)).toFixed(2)}

                </div>

            </div>

            `;

        });

        list.innerHTML = html;

    }

    catch(err){

        console.log(err);

    }

}

// ===============================
// START
// ===============================

loadWallet();

loadTransactions();