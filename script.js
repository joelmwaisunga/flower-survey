let currentUserName = "";

// 1. CHECK PASSWORD
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
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("question-page").classList.add("active");
    } else {
        errorMsg.innerText = "Wrong password! Hint: 1234";
    }
}

// 2. SUBMIT ANSWERS
function submitAnswers(event) {
    event.preventDefault();

    const dataToSave = {
        name: currentUserName,
        question_1: document.getElementById("q1").value,
        question_2: document.getElementById("q2").value,
        question_3: document.getElementById("q3").value,
        question_4: document.getElementById("q4").value,
        question_5: document.getElementById("q5").value
    };

    let allResponses = JSON.parse(localStorage.getItem("floral_responses")) || [];
    allResponses.push(dataToSave);
    localStorage.setItem("floral_responses", JSON.stringify(allResponses));

    document.getElementById("question-page").classList.remove("active");
    document.getElementById("success-page").classList.add("active");
    
    // Reset form for the next person
    document.getElementById("quiz-form").reset();
}

// 3. OPEN THE SECRET ADMIN VIEW
function openAdminPanel() {
    // Ask for a Master Secret Password so random people can't open it
    const adminPassword = prompt("Enter Master Admin Password:");
    
    if (adminPassword === "admin123") {
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("admin-page").classList.add("active");
        
        displayResponses();
    } else if (adminPassword !== null) {
        alert("Access Denied! Incorrect Admin Password.");
    }
}

// 4. DISPLAY RESPONSES ON SCREEN
function displayResponses() {
    const container = document.getElementById("responses-container");
    container.innerHTML = ""; // Clear old text
    
    let allResponses = JSON.parse(localStorage.getItem("floral_responses")) || [];
    
    if (allResponses.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No submissions found yet.</p>";
        return;
    }
    
    // Loop through each entry and build layout boxes
    allResponses.forEach((entry) => {
        const card = document.createElement("div");
        card.className = "response-card";
        
        card.innerHTML = `
            <h3>Name: ${entry.name}</h3>
            <div class="response-item"><strong>Q1 (Outfit):</strong> ${entry.question_1}</div>
            <div class="response-item"><strong>Q2 (Alien Movie):</strong> ${entry.question_2}</div>
            <div class="response-item"><strong>Q3 (Awkward Lie):</strong> ${entry.question_3}</div>
            <div class="response-item"><strong>Q4 (Argument):</strong> ${entry.question_4}</div>
            <div class="response-item"><strong>Q5 (Bad Advice):</strong> ${entry.question_5}</div>
        `;
        container.appendChild(card);
    });
}

function goBackToLogin() {
    document.getElementById("admin-page").classList.remove("active");
    document.getElementById("login-page").classList.add("active");
}
