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

  // Check if the username already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    alert('Username already taken!');
    return;
  }

  // Store new user in localStorage
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

  // Check if user exists and password matches
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    alert('Invalid username or password!');
    return;
  }

  // Store signed-in user to manage tasks later
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
    showSignInForm(); // Redirect back to sign in after submitting
  } else {
    alert('Please enter your email address.');
  }
}

// Add a new task with a due date
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

  // Append task text, due date, checkbox, and delete button to the list item
  li.appendChild(taskText);
  li.appendChild(taskDueDate);
  li.appendChild(checkbox);
  li.appendChild(deleteBtn);

  // Append the list item to the ul
  document.getElementById('todoList').appendChild(li);

  // Store the new task in localStorage
  storeTasks();

  // Clear the input fields
  todoInput.value = '';
  dueDateInput.value = '';
});

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

  // Save tasks in localStorage as a JSON string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      const li = document.createElement('li');

      // Create task text
      const taskText = document.createElement('span');
      taskText.textContent = task.text;

      // Create due date text
      const taskDueDate = document.createElement('span');
      taskDueDate.textContent = `Due: ${task.dueDate}`;
      taskDueDate.classList.add('due-date');

      // Create checkbox and set it to checked if completed
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.onclick = () => toggleCompleteTask(li, checkbox);

      // Create a "Delete" button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => removeTodoItem(li);

      // Append elements to the list item
      li.appendChild(taskText);
      li.appendChild(taskDueDate);
      li.appendChild(checkbox);
      li.appendChild(deleteBtn);

      // Mark task as completed if needed
      if (task.completed) {
        li.classList.add('completed');
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = '#888';
      }

      // Add the list item to the ul
      document.getElementById('todoList').appendChild(li);
    });
  }
}
