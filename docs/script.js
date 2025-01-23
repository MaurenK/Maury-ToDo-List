// Function to display the current time
function updateClock() {
  const clockElement = document.getElementById('clock');
  const currentTime = new Date();
  
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let period = 'AM';
  
  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
    period = 'PM';
  } else if (hours === 0) {
    hours = 12; // Midnight is 12:00 AM
  }

  // Add leading zero if needed
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Display the time in the format HH:MM:SS AM/PM
  clockElement.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();

// Load tasks when the page loads
window.onload = function() {
  loadTasks(); // Load tasks from localStorage if the user is signed in
};

// Show Sign-In Form
function showSignInForm() {
  document.getElementById('signUpForm').style.display = 'none';
  document.getElementById('forgotPasswordForm').style.display = 'none';
  document.getElementById('signInForm').style.display = 'block';
}

// Show Sign-Up Form
function showSignUpForm() {
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('forgotPasswordForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'block';
}

// Show Forgot Password Form
function showForgotPasswordForm() {
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('forgotPasswordForm').style.display = 'block';
}

// Handle Sign Up
function signUp() {
  const username = document.getElementById('signUpUsername').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;

  if (!username || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    alert('Username already taken!');
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Sign Up successful! You can now sign in.');
  showSignInForm();
}

// Handle Sign In
function signIn() {
  const username = document.getElementById('signInUsername').value;
  const password = document.getElementById('signInPassword').value;

  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    alert('Invalid username or password!');
    return;
  }

  localStorage.setItem('signedInUser', JSON.stringify(user));
  alert('Sign In successful!');
  showTodoSection();
}

// Show To-Do Section after successful sign-in
function showTodoSection() {
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('todoSection').style.display = 'block';
}

// Handle Forgot Password
function resetPassword() {
  const email = document.getElementById('forgotPasswordEmail').value;
  if (email) {
    alert('Password reset link sent to ' + email);
    showSignInForm();
  } else {
    alert('Please enter your email address.');
  }
}

// Add a new task with a due date and reminder
document.getElementById('addBtn').addEventListener('click', function() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  const dueDateInput = document.getElementById('dueDate');
  const dueDate = dueDateInput.value;

  if (todoText === '') {
    alert('Please enter a task');
    return;
  }

  if (!dueDate) {
    alert('Please select a due date');
    return;
  }

  // Create a new list item
  const li = document.createElement('li');

  // Create the task text element
  const taskText = document.createElement('span');
  taskText.textContent = todoText;

  // Create the due date text element
  const taskDueDate = document.createElement('span');
  taskDueDate.textContent = `Due: ${dueDate}`;
  taskDueDate.classList.add('due-date');

  // Create a checkbox for task completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onclick = () => toggleCompleteTask(li, checkbox);

  // Create a "Delete" button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => removeTodoItem(li);

  // Create a "Set Reminder" button for linking to Google Calendar
  const reminderBtn = document.createElement('button');
  reminderBtn.textContent = 'Set Reminder';
  reminderBtn.onclick = () => setReminder(todoText, dueDate);

  // Append task text, due date, checkbox, delete button, and reminder button to the list item
  li.appendChild(taskText);
  li.appendChild(taskDueDate);
  li.appendChild(checkbox);
  li.appendChild(deleteBtn);
  li.appendChild(reminderBtn);

  // Append the list item to the ul
  document.getElementById('todoList').appendChild(li);

  // Store the new task in localStorage
  storeTasks();

  // Clear the input fields
  todoInput.value = '';
  dueDateInput.value = '';
});

// Function to create a Google Calendar event link (set reminder)
function setReminder(taskText, dueDate) {
  // Convert dueDate to a format that Google Calendar can accept (YYYYMMDDTHHmmss)
  const dueDateTime = new Date(dueDate);
  const year = dueDateTime.getFullYear();
  const month = ('0' + (dueDateTime.getMonth() + 1)).slice(-2); // 0-based month
  const day = ('0' + dueDateTime.getDate()).slice(-2);
  const hours = ('0' + dueDateTime.getHours()).slice(-2);
  const minutes = ('0' + dueDateTime.getMinutes()).slice(-2);

  const startDateTime = `${year}${month}${day}T${hours}${minutes}00`;

  // Generate the Google Calendar event link
  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(taskText)}&dates=${startDateTime}/${startDateTime}&details=${encodeURIComponent('Task: ' + taskText)}`;

  // Open the Google Calendar event in a new window
  window.open(calendarLink, '_blank');
}

// Remove a task
function removeTodoItem(li) {
  li.remove();
  storeTasks(); // Update the storage after deleting a task
}

// Toggle a task's completed state using the checkbox
function toggleCompleteTask(li, checkbox) {
  const taskText = li.querySelector('span'); // Get task text
  const taskDueDate = li.querySelector('.due-date'); // Get task due date

  if (checkbox.checked) {
    // Mark as completed
    li.classList.add('completed');
    taskText.style.textDecoration = 'line-through'; // Add strike-through effect
    taskText.style.color = '#888'; // Change text color to gray
  } else {
    // Undo completion (unclick the task)
    li.classList.remove('completed');
    taskText.style.textDecoration = 'none'; // Remove strike-through
    taskText.style.color = ''; // Restore text color
  }

  storeTasks(); // Update the storage after toggling the completion
}

// Store tasks in localStorage
function storeTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll('#todoList li');

  taskItems.forEach(item => {
    const taskText = item.querySelector('span').textContent;
    const taskDueDate = item.querySelector('.due-date').textContent.replace('Due: ', '');
    const isCompleted = item.querySelector('input').checked;
    tasks.push({ text: taskText, dueDate: taskDueDate, completed: isCompleted });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks in localStorage as a JSON string
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      const li = document.createElement('li');

      const taskText = document.createElement('span');
      taskText.textContent = task.text;

      const taskDueDate = document.createElement('span');
      taskDueDate.textContent = `Due: ${task.dueDate}`;
      taskDueDate.classList.add('due-date');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.onclick = () => toggleCompleteTask(li, checkbox);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => removeTodoItem(li);

      li.appendChild(taskText);
      li.appendChild(taskDueDate);
      li.appendChild(checkbox);
      li.appendChild(deleteBtn);

      if (task.completed) {
        li.classList.add('completed');
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = '#888';
      }

      document.getElementById('todoList').appendChild(li);
    });
  }
}
