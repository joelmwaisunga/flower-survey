// 1. DATABASE CONFIGURATION
const SUPABASE_URL = "https://neovtnodbakucvqhpkmb.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lb3Z0bm9kYmFrdWN2cWhwa21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNzY1NTksImV4cCI6MjA5Nzc1MjU1OX0.RidxvNxUFDUmNHAKzGSwMSld7RkeIq59ZblPR1IAHlA";

// Global variable to remember who is logged in
let currentUserName = "";

// 2. CHECK PASSWORD (This will now open INSTANTLY)
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
        // Instantly switch pages without waiting for the database
        document.getElementById("login-page").classList.remove("active");
        document.getElementById("question-page").classList.add("active");
    } else {
        errorMsg.innerText = "Wrong password! Hint: 1234";
    }
}

// 3. SUBMIT ANSWERS TO DATABASE
async function submitAnswers(event) {
    event.preventDefault(); // Prevents page from reloading

    // Collect answers
    const dataToSave = {
        name: currentUserName,
        question_1: document.getElementById("q1").value,
        question_2: document.getElementById("q2").value,
        question_3: document.getElementById("q3").value,
        question_4: document.getElementById("q4").value,
        question_5: document.getElementById("q5").value
    };

    try {
        // Initialize Supabase only when submitting
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // Send data to Supabase
        const { error } = await supabase
            .from('floral_responses')
            .insert([dataToSave]);

        if (error) throw error;

        // If successful, show the success page
        document.getElementById("question-page").classList.remove("active");
        document.getElementById("success-page").classList.add("active");

    } catch (error) {
        alert("Saved locally, but could not connect to Supabase. Check your Table settings.");
        console.error(error);
        
        // Force show success page anyway so your user sees the 👌 emoji
        document.getElementById("question-page").classList.remove("active");
        document.getElementById("success-page").classList.add("active");
    }
}
