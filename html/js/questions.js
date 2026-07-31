const container = document.getElementById("questions");
const userId = localStorage.getItem("userId");

const timerElement = document.getElementById("timer");
const quizIntro = document.getElementById("quizIntro");
const quizArea = document.getElementById("quizArea");
const startBtn = document.getElementById("startQuizBtn");

let timer;
let timeLeft = 40;
let questions = [];

// Redirect if user isn't logged in
if (!userId) {
    window.location.href = "login.html";
}

// ===============================
// START TIMER
// ===============================

function startTimer() {

    timerElement.innerText = "00:40";

    timer = setInterval(() => {

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerElement.innerText =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 20) {

            timerElement.style.color = "#f59e0b";

        }

        if (timeLeft <= 10) {

            timerElement.style.color = "#ef4444";

            timerElement.classList.add("flash");

        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("⏰ Time is up!");

            document.getElementById("questionForm").requestSubmit();

        }

    }, 1000);

}

// ===============================
// LOAD QUESTIONS
// ===============================

async function loadQuestions() {

    const res = await fetch(
        `https://businessserver-7x7f.onrender.com/api/questions/${userId}`
    );

    const data = await res.json();

    // Already answered today
    if (data.completed) {

        quizIntro.style.display = "none";
        quizArea.style.display = "block";

        container.innerHTML = `
            <div class="completed-box">
                <h2>✅ Today's Questions Completed</h2>
                <p>You have already answered today's questions.</p>
                <p>Please come back tomorrow.</p>
            </div>
        `;

        document.querySelector(".submitBtn").style.display = "none";

        document.querySelector(".timer-box").style.display = "none";

        return;

    }

    questions = data.questions;

    if (questions.length === 0) {

        quizIntro.style.display = "none";
        quizArea.style.display = "block";

        container.innerHTML = `
            <div class="no-questions">
                <h3>No questions have been published today.</h3>
            </div>
        `;

        document.querySelector(".submitBtn").style.display = "none";

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

    startTimer();

}

// ===============================
// START QUIZ BUTTON
// ===============================

startBtn.addEventListener("click", async () => {

    const ok = confirm(
        "Once you start, the timer begins immediately.\n\nAre you ready?"
    );

    if (!ok) return;

    quizIntro.style.display = "none";

    quizArea.style.display = "block";

    await loadQuestions();

});
// ===============================
// SUBMIT QUIZ
// ===============================

document.getElementById("questionForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    clearInterval(timer);

    let answers = [];

    for (let i = 0; i < questions.length; i++) {

        const selected = document.querySelector(`input[name="q${i}"]:checked`);

        answers.push(selected ? selected.value : null);

    }

    try {

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

            alert(
                "🎉 Congratulations!\n\n" +
                "You scored 10/10.\n\n" +
                "GHS 0.50 has been added to your Question Wallet."
            );

        } else {

            alert(
                `You scored ${data.score}/10.\n\nBetter luck tomorrow!`
            );

        }

        // Reset timer
        timeLeft = 40;

        timerElement.innerText = "00:40";

        timerElement.style.color = "";

        timerElement.classList.remove("flash");

        // Reload page to show completed message
        location.reload();

    }

    catch (err) {

        console.error(err);

        alert("Something went wrong. Please try again.");

    }

});