// Global variable to remember who is logged in
let currentUserName = "";

// CHECK PASSWORD
function checkPassword() {
    const nameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value;
    const errorMsg = document.getElementById("login-error");

    if (nameInput === "") {
        errorMsg.innerText = "Please enter your beautiful name first!";
        return;
    }

    if (passInput === "1234") {
        currentUserName = nameInput;
        // HIDES Login Page, SHOWS Questionnaire Page instantly
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("question-page").classList.add("active");
    } else {
        errorMsg.innerText = "Wrong password! Hint: 1234";
    }
}

// SUBMIT ANSWERS
function submitAnswers(event) {
    event.preventDefault(); // Prevents page from reloading

    // HIDES Questionnaire Page, SHOWS Success Page with the 👌 emoji
    document.getElementById("question-page").classList.remove("active");
    document.getElementById("success-page").classList.add("active");
}
