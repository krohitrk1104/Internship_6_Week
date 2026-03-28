// ==========================================
// STEP 2: INTERACTIVE QUIZ
// ==========================================

// An array of objects holding our quiz data
const quizData = [
    {
        question: "What is the time complexity of a standard Binary Search algorithm?",
        options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"],
        correct: 2 // The index of the correct answer (0-based)
    },
    {
        question: "Which hook in React is used to manage local state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 1
    },
    {
        question: "Which of the following is NOT a core component of a DBMS?",
        options: ["Query Processor", "Storage Manager", "Network Router", "Database Engine"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Grab elements from the HTML
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizResult = document.getElementById("quiz-result");

function loadQuestion() {
    // Get the current question object
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // Clear out old buttons
    optionsContainer.innerHTML = ""; 
    
    // Create a new button for each option
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        
        // When clicked, check if it's correct
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    
    if (selectedIndex === correctIndex) {
        score++;
    }
    
    // Disable all buttons so the user can't click again
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
    
    // Show the Next button
    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion(); // Load next question
        nextBtn.classList.add("hidden"); // Hide the next button again
    } else {
        // Quiz is over
        questionText.textContent = "Quiz Complete!";
        optionsContainer.innerHTML = ""; // Clear buttons
        quizResult.textContent = `You scored ${score} out of ${quizData.length}!`;
        quizResult.classList.remove("hidden");
        nextBtn.classList.add("hidden");
    }
});

// Start the quiz when the page loads
loadQuestion();


// ==========================================
// STEP 3: FETCH DATA FROM AN API
// ==========================================

const jokeSetup = document.getElementById("joke-setup");
const jokePunchline = document.getElementById("joke-punchline");
const fetchJokeBtn = document.getElementById("fetch-joke-btn");

// We use 'async/await' to handle the delay of fetching data from the web
async function fetchJoke() {
    jokeSetup.textContent = "Loading joke...";
    jokePunchline.classList.add("hidden");
    
    try {
        // We are requesting a tech/programming joke from a public API
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart");
        
        // Convert the raw response into a JSON object we can read
        const data = await response.json();
        
        // Update the HTML with the API data
        if (data.setup) {
            jokeSetup.textContent = data.setup;
            jokePunchline.textContent = data.delivery;
            jokePunchline.classList.remove("hidden");
        } else {
            jokeSetup.textContent = "Oops, couldn't find a joke right now!";
        }
    } catch (error) {
        // This runs if the fetch fails (e.g., no internet connection)
        jokeSetup.textContent = "Error fetching data. Are you connected to the internet?";
    }
}

// Fetch a joke when the button is clicked
fetchJokeBtn.addEventListener("click", fetchJoke);