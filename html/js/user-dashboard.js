const user = {

    fullname: "John Doe",

    wallet: 0,

    questionBalance: 0,

    referralBalance: 0,

    referralCode: "REF100245"

};

document.getElementById("userName").innerHTML =
user.fullname;

document.getElementById("walletBalance").innerHTML =
"₵"+user.wallet.toFixed(2);

document.getElementById("questionBalance").innerHTML =
"₵"+user.questionBalance.toFixed(2);

document.getElementById("referralBalance").innerHTML =
"₵"+user.referralBalance.toFixed(2);

document.getElementById("referralCode").innerHTML =
user.referralCode;