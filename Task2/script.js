// ==========================================
// STEP 2: FORM VALIDATION
// ==========================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(event) {
    // 1. Prevent the page from refreshing immediately
    event.preventDefault(); 
    
    let isValid = true;

    // 2. Clear out any old error messages
    nameError.textContent = '';
    emailError.textContent = '';
    successMessage.classList.add('hidden');

    // 3. Check if name is empty
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    }

    // 4. Check if email is empty OR formatted incorrectly
    // This is a Regular Expression (Regex) that checks for basic "text@text.text" formatting
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address format.';
        isValid = false;
    }

    // 5. If there are no errors, show the success message!
    if (isValid) {
        successMessage.classList.remove('hidden');
        contactForm.reset(); // Empties the input fields
    }
});


// ==========================================
// STEP 4: DYNAMIC TO-DO LIST (DOM MANIPULATION)
// ==========================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();

    // Only add a task if the input isn't empty
    if (taskText !== '') {
        
        // 1. Create a brand new <li> element using JavaScript
        const li = document.createElement('li');
        li.classList.add('task-item'); // Give it our CSS class

        // 2. Put the text and a remove button inside that <li>
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Remove</button>
        `;

        // 3. Append (add) it to the <ul> on the webpage
        taskList.appendChild(li);

        // 4. Clear the text box so they can type another task
        taskInput.value = '';

        // 5. Tell the specific "Remove" button we just created to delete its parent <li> when clicked
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove(); 
        });
        
    } else {
        alert("Please type a task first!");
    }
}

// Listen for clicks on the "Add Task" button
addTaskBtn.addEventListener('click', addTask);