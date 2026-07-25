const container = document.getElementById("questions");
const userId = localStorage.getItem("userId");


async function loadQuestions() {

    const res = await fetch(
    `https://businessserver-7x7f.onrender.com/api/questions/${userId}`
);

    const data = await res.json();

if (data.completed) {

    container.innerHTML = `
        <div class="completed-box">
            <h2>✅ Today's Questions Completed</h2>
            <p>
                You have already answered today's questions.
            </p>
            <p>
                Please come back tomorrow for a new set.
            </p>
        </div>
    `;

    document.querySelector(".submitBtn").style.display="none";

    return;

}

const questions = data.questions;
    if (questions.length === 0) {

    container.innerHTML = `
        <div class="no-questions">
            <h3>No questions have been published for today.</h3>
            <p>Please come back later.</p>
        </div>
    `;

    return;

}

    let html = "";

    questions.forEach((q, index) => {

        html += `

        <div class="question">

            <h4>${index + 1}. ${q.question}</h4>

            <label class="option">
                <input type="radio" name="q${index}" value="0">
                ${q.option_a}
            </label>

            <label class="option">
                <input type="radio" name="q${index}" value="1">
                ${q.option_b}
            </label>

            <label class="option">
                <input type="radio" name="q${index}" value="2">
                ${q.option_c}
            </label>

            <label class="option">
                <input type="radio" name="q${index}" value="3">
                ${q.option_d}
            </label>

        </div>

        `;

    });

    container.innerHTML = html;

}

loadQuestions();
document.getElementById("questionForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    let answers = [];

    for (let i = 0; i < 10; i++) {

        const answer = document.querySelector(`input[name="q${i}"]:checked`);

        answers.push(answer ? answer.value : null);

    }

    const response = await fetch(
        "https://businessserver-7x7f.onrender.com/api/questions/submit",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                answers
            })
        }
    );

    const data = await response.json();

    if (!data.success) {

        alert(data.message);
        return;

    }

    if (data.score === 10) {

        alert("🎉 Congratulations!\n\nYou scored 10/10.\nGHS 0.50 has been added to your Question Wallet.");

    } else {

        alert(`You scored ${data.score}/10.\n\nBetter luck tomorrow!`);

    }

    loadQuestions();

});