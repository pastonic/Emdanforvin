console.log("Dashboard.js loaded");
//const socket = io("https://businessserver-7x7f.onrender.com");

const userId = localStorage.getItem("userId");



if (!userId) {

    window.location.href = "login.html";

}

/* ===============================
   LOAD USER
================================ */
console.log("Current User ID:", userId);

async function loadDashboard() {

    try {

       const res = await fetch(
`https://businessserver-7x7f.onrender.com/api/dashboard/status/${userId}`
);

        console.log("Status:", res.status);

        const data = await res.json();

        console.log("Dashboard API:", data);

        if (!data.success) {

    alert(data.message);

    localStorage.removeItem("userId");

    window.location.href = "login.html";

    return;

}


        const user = data.user;

        document.getElementById("memberName").innerText =
            user.fullname;

        document.getElementById("welcomeName").innerText =
            user.fullname;

        document.getElementById("memberStatus").innerText =
            user.status;

        document.getElementById("membershipStatus").innerText =
            user.status;

        document.getElementById("membershipCard").innerText =
            user.status;

        document.getElementById("avatar").innerText =
            user.fullname.charAt(0).toUpperCase();

    }

    catch(err){

        console.log(err);

    }

}

async function loadProfile() {

    try {

        const res = await fetch(
            `https://businessserver-7x7f.onrender.com/api/profile/${userId}`
        );

        const data = await res.json();

        if (!data.success) return;

        const user = data.user;

        document.getElementById("questionWallet").innerText =
           "GHS " + Number(user.token_balance).toFixed(2);

        document.getElementById("referralWallet").innerText =
            "GHS " + Number(user.referral_balance).toFixed(2);

        const referralLink =
`https://emdanforvin.vercel.app/register.html?ref=${user.referral_code}`;

document.getElementById("referralLink").value =
referralLink;
    }

    catch(err){

        console.log(err);

    }

}



/* ===============================
   LOAD REFERRALS
================================ */

async function loadReferrals() {

    try {

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/referrals/${userId}`

        );

        const data = await res.json();

        document.getElementById("totalReferrals").innerText =
            data.totalReferrals;

        document.getElementById("referralCount").innerText =
            data.totalReferrals + " Referrals";

        let percentage = data.totalReferrals * 10;

        if (percentage > 100) percentage = 100;

        document.getElementById("progressBar").style.width =
            percentage + "%";

    }

    catch (err) {

        console.log(err);

    }

}



/* ===============================
   COPY REFERRAL
================================ */
document
.getElementById("copyReferralBtn")
.addEventListener("click",()=>{

const link =
document.getElementById("referralLink").value;

navigator.clipboard.writeText(link);

alert("Referral link copied.");

});
document
.getElementById("shareReferralBtn")
.addEventListener("click",async()=>{

const link =
document.getElementById("referralLink").value;

const message =

`🔥 I earned GHS 300 from just answering questions on Emdanforvin!

Join me today and start earning every week.

👇 Register using my referral link:

${link}`;

if(navigator.share){

try{

await navigator.share({

title:"Join Emdanforvin",

text:message

});

}catch(err){

console.log(err);

}

}else{

navigator.clipboard.writeText(message);

alert("Referral message copied.");

}

});

/* ===============================
   SIDEBAR
================================ */

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {

    sidebar.classList.toggle("show");

    overlay.classList.toggle("show");

    document.body.classList.toggle("sidebar-open");

};
/* ===============================
   PROFILE MENU
================================ */

const adminBtn = document.getElementById("adminBtn");

const adminDropdown =
    document.getElementById("adminDropdown");

adminBtn.onclick = () => {

    adminDropdown.classList.toggle("show");

};

/* ===============================
   NOTIFICATIONS
================================ */

const notificationBtn =
document.getElementById("notificationBtn");

const notificationDropdown =
document.getElementById("notificationDropdown");

notificationBtn.onclick = () => {

    notificationDropdown.classList.toggle("show");

};

/* ===============================
   DARK MODE
================================ */

const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {

    document.body.classList.toggle("dark");

};

/* ===============================
   ACTIVITY
================================ */

/* ===============================
   LOAD ACTIVITIES
================================ */

async function loadActivities() {

    try {

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/activity/${userId}`

        );

        const data = await res.json();

        const activity =
            document.getElementById("activityList");

        if (!data.success || data.activities.length === 0) {

            activity.innerHTML = `

                <p>No recent activity.</p>

            `;

            return;

        }

        let html = "";

        data.activities.forEach(item => {

            let icon = "fa-circle-info";
            let color = "blue";

            if (item.type === "referral") {

                icon = "fa-user-group";
                color = "green";

            }

            if (item.type === "withdrawal") {

                icon = "fa-money-bill-wave";
                color = "orange";

            }

            if (item.type === "question") {

                icon = "fa-circle-question";
                color = "purple";

            }

            if (item.type === "membership") {

                icon = "fa-crown";
                color = "gold";

            }

            html += `

            <div class="activity-item">

                <div class="activity-icon ${color}">

                    <i class="fa-solid ${icon}"></i>

                </div>

                <div class="activity-details">

                    <h5>${item.title}</h5>

                    <p>${item.description}</p>

                    <small>

                        ${new Date(item.created_at).toLocaleString()}

                    </small>

                </div>

            </div>

            `;

        });

        activity.innerHTML = html;

    }

    catch(err){

        console.log(err);

    }

}



/* ===============================
   TRANSACTIONS
================================ */

/* ===============================
   LOAD TRANSACTIONS
================================ */

async function loadTransactions() {

    try {

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/transactions/${userId}`

        );

        const data = await res.json();

        const table =
            document.getElementById("transactionTable");

        if (!data.success || data.transactions.length === 0) {

            table.innerHTML = `

                <tr>

                    <td colspan="3">

                        No transactions.

                    </td>

                </tr>

            `;

            return;

        }

        let html = "";

        data.transactions.forEach(t => {

            html += `

            <tr>

                <td>

                    ${new Date(t.created_at).toLocaleDateString()}

                </td>

                <td>

                    ${t.amount >= 0 ? "GHS " : "-GHS "}

                    ${Math.abs(Number(t.amount)).toFixed(2)}

                </td>

                <td>

                    ${t.title}

                </td>

            </tr>

            `;

        });

        table.innerHTML = html;

    }

    catch(err){

        console.log(err);

    }

}




/* ===============================
   LOAD NOTIFICATIONS
================================ */

async function loadNotifications() {

    try {

        const res = await fetch(

            `https://businessserver-7x7f.onrender.com/api/notifications/${userId}`

        );

        const data = await res.json();

        const list =
            document.getElementById("notificationList");

        const dot =
            document.querySelector(".badge-dot");

        if (!data.success || data.notifications.length === 0) {

            list.innerHTML = `

                <p>No notifications yet.</p>

            `;

            dot.style.display = "none";

            return;

        }

        let html = "";

        let unread = 0;

        data.notifications.forEach(n => {

            if (!n.is_read) unread++;

            html += `

            <div
                class="notification-item ${n.is_read ? "" : "unread"}"
                onclick="markNotificationRead(${n.id})"
            >

                <h6>${n.title}</h6>

                <p>${n.message}</p>

                <small>

                    ${new Date(n.created_at).toLocaleString()}

                </small>

            </div>

            `;

        });

        list.innerHTML = html;

        if (unread === 0) {

            dot.style.display = "none";

        } else {

            dot.style.display = "block";

        }

    }

    catch(err){

        console.log(err);

    }

}
async function markNotificationRead(id){

    try{

        await fetch(

            `https://businessserver-7x7f.onrender.com/api/notifications/read/${id}`,

            {

                method:"PUT"

            }

        );

        loadNotifications();

    }

    catch(err){

        console.log(err);

    }

}
/* ===============================
   LOGOUT
================================ */

function logout() {

    localStorage.removeItem("userId");

    window.location.href = "login.html";

}

document
.getElementById("logoutBtn")
.addEventListener("click", logout);

document
.getElementById("logoutLink")
.addEventListener("click", logout);


// Load everything after the page has been parsed
loadDashboard();
loadProfile();
loadReferrals();
loadActivities();
loadTransactions();
loadNotifications();

