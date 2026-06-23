// 1. DATABASE CONFIGURATION
// You will get these two credentials in Step 5.
const SUPABASE_URL = "https://neovtnodbakucvqhpkmb.supabase.co/rest/v1/"; 
const SUPABASE_KEY = "sb_publishable_RoanbZtIgScLeJPBjtXJEw_5qUOVniy";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Global variable to remember who is logged in
let currentUserName = "";

// 2. CHECK PASSWORD
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
        // Hide Login Page, Show Questionnaire
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
        question_5: document.getElementById("q5").value,
        submitted_at: new Date()
    };

    try {
        // Send to Supabase Table named "floral_responses"
        const { error } = await supabase
            .from('floral_responses')
            .insert([dataToSave]);

        if (error) throw error;

        // If successful, show the success page
        document.getElementById("question-page").classList.remove("active");
        document.getElementById("success-page").classList.add("active");

    } catch (error) {
        alert("Oops! Something went wrong saving your data. Check your connection.");
        console.error(error);
    }
}
