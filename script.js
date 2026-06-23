let currentUserName = "";

// 1. USER PASSWORD VERIFICATION (1234)
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
        // Move instantly to your questionnaire
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("question-page").classList.add("active");
    } else {
        errorMsg.innerText = "Wrong password! Hint: 1234";
    }
}

// 2. SUBMIT FORM (Saves data locally & triggers beautiful 👌👌 Thank You page)
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

    // Store responses securely inside local browser memory layer
    let allResponses = JSON.parse(localStorage.getItem("floral_responses")) || [];
    allResponses.push(dataToSave);
    localStorage.setItem("floral_responses", JSON.stringify(allResponses));

    // Show the user the stunning Success screen 
    document.getElementById("question-page").classList.remove("active");
    document.getElementById("success-page").classList.add("active");
    
    // Clear out form fields for clean reload loop later
    document.getElementById("quiz-form").reset();
}

// 3. OPEN ADMIN GATEWAY (Requires password: joel)
function openAdminPanel() {
    const adminPassword = prompt("Enter Admin Password:");
    
    if (adminPassword === "joel") {
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("admin-page").classList.add("active");
        
        displayResponses();
    } else if (adminPassword !== null) {
        alert("Access Denied! You are not authorized to view subscriptions.");
    }
}

// 4. DISPLAY RECORDED SUBMISSIONS
function displayResponses() {
    const container = document.getElementById("responses-container");
    container.innerHTML = ""; 
    
    let allResponses = JSON.parse(localStorage.getItem("floral_responses")) || [];
    
    if (allResponses.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#95a5a6;'>No garden subscriptions found yet.</p>";
        return;
    }
    
    // Dynamically insert entries as beautiful clean logs
    allResponses.forEach((entry) => {
        const card = document.createElement("div");
        card.className = "response-card";
        
        card.innerHTML = `
            <h3>${entry.name}</h3>
            <div class="response-item"><strong>Outfit Secret:</strong> ${entry.question_1}</div>
            <div class="response-item"><strong>Alien Movie:</strong> ${entry.question_2}</div>
            <div class="response-item"><strong>Panicked Lie:</strong> ${entry.question_3}</div>
            <div class="response-item"><strong>Blind Argument:</strong> ${entry.question_4}</div>
            <div class="response-item"><strong>Terrible Advice:</strong> ${entry.question_5}</div>
        `;
        container.appendChild(card);
    });
}

// 5. DELETE RESPONSES
function clearAllData() {
    const confirmDelete = confirm("Permanently erase all responses from memory?");
    if (confirmDelete) {
        localStorage.removeItem("floral_responses");
        displayResponses();
        alert("Garden database wiped clean!");
    }
}

function goBackToLogin() {
    document.getElementById("admin-page").classList.remove("active");
    document.getElementById("login-page").classList.add("active");
}
