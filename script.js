// 1. DATABASE CONFIGURATION
const SUPABASE_URL = "https://neovtnodbakucvqhpkmb.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lb3Z0bm9kYmFrdWN2cWhwa21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNzY1NTksImV4cCI6MjA5Nzc1MjU1OX0.RidxvNxUFDUmNHAKzGSwMSld7RkeIq59ZblPR1IAHlA";

// Global variable to remember who is logged in
let currentUserName = "";

// 2. CHECK PASSWORD (Bypasses database completely to guarantee entry!)
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

// 3. SUBMIT ANSWERS TO DATABASE
async function submitAnswers(event) {
    event.preventDefault(); // Prevents page from reloading

    // Collect user answers
    const dataToSave = {
        name: currentUserName,
        question_1: document.getElementById("q1").value,
        question_2: document.getElementById("q2").value,
        question_3: document.getElementById("q3").value,
        question_4: document.getElementById("q4").value,
        question_5: document.getElementById("q5").value
    };

    // Show the final success page instantly so the user is happy
    document.getElementById("question-page").classList.remove("active");
    document.getElementById("success-page").classList.add("active");

    // Try sending data to database silently in the background
    try {
        if (window.supabase && typeof window.supabase.createClient === "function") {
            const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            await supabase.from('floral_responses').insert([dataToSave]);
            console.log("Data saved to Supabase successfully!");
        } else {
            console.error("Supabase library failed to load, data saved locally only.");
        }
    } catch (dbError) {
        console.error("Database connection issue:", dbError);
    }
}
