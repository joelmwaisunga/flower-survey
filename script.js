// Global variable to remember who is logged in
let currentUserName = "";

// 1. CHECK PASSWORD (Works instantly, no internet required)
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
        
        // Move to the questionnaire page instantly
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("question-page").classList.add("active");
    } else {
        errorMsg.innerText = "Wrong password! Hint: 1234";
    }
}

// 2. SUBMIT ANSWERS (Saves data locally inside the computer browser)
function submitAnswers(event) {
    event.preventDefault(); // Prevents page from reloading

    // Collect user answers
    const dataToSave = {
        name: currentUserName,
        question_1: document.getElementById("q1").value,
        question_2: document.getElementById("q2").value,
        question_3: document.getElementById("q3").value,
        question_4: document.getElementById("q4").value,
        question_5: document.getElementById("q5").value,
        submitted_at: new Date().toLocaleString()
    };

    // Fetch existing responses or create an empty array if none exist
    let allResponses = JSON.parse(localStorage.getItem("floral_responses")) || [];
    
    // Add the new submission to our list
    allResponses.push(dataToSave);
    
    // Save it securely back into the browser's storage
    localStorage.setItem("floral_responses", JSON.stringify(allResponses));

    // Show the final success page with the 👌 emoji instantly
    document.getElementById("question-page").classList.remove("active");
    document.getElementById("success-page").classList.add("active");
}
