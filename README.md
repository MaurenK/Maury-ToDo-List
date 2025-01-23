## To-Do List Application
A simple and interactive To-Do list web application with user authentication, task management, and reminders. The application allows users to sign up, sign in, reset passwords, and manage their tasks, including setting reminders. It also displays the current time and provides alarm notifications for due tasks.

## Features
## User Authentication:
Sign Up, Sign In, and Forgot Password functionality.
Securely store user credentials in localStorage.
## To-Do List:

Add tasks with due dates.
Mark tasks as completed.
Delete tasks.
Set reminders for tasks that trigger browser notifications and an alert sound.
# Clock:

A real-time clock that updates every second, displayed at the top of the page.
# Task Reminders:

Set an alarm for each task. Once the time expires, the user will receive an alert notification (and optionally a browser notification).
Installation
# To run this application locally, follow these steps:

## Prerequisites
A modern web browser (Google Chrome, Firefox, Safari, etc.)
Steps
Download the Project Files:

## Clone this repository or download the zip file of the project.
bash
Copy
git clone https://github.com/your-username/todo-list.git
File Structure: Your project should have the following structure:

## bash
Copy
/todo-list
  ├── index.html
  ├── style.css
  ├── script.js
  └── README.md
## Open the Application:

Open the index.html file in your web browser to start using the To-Do list.
How to Use
## 1. Sign Up / Sign In
Sign Up: Create a new account by providing a username, email, and password.
Sign In: Log in with your credentials.
Forgot Password: Reset your password by entering your email.
## 2. Adding Tasks
After signing in, navigate to the To-Do list section.
Enter a task in the input field.
Select a due date for the task.
Click the "Add Task" button to add the task to your list.
## 3. Managing Tasks
Mark as Completed: Click the checkbox next to a task to mark it as completed (it will strike through and change color).
Delete Task: Click the delete button next to a task to remove it from the list.
## 4. Setting Reminders
Put Alarm Clock: For each task, you can set a reminder by clicking the "Put Alarm Clock" button next to the task.
Set Time for Reminder: Choose the number of minutes after which you'd like to be reminded about the task.
The reminder will trigger an alert and a browser notification once the specified time has passed.
## 5. Clock
The current time is displayed in the top header, updating every second.
Technologies Used
## HTML5: For structuring the content.
## CSS3: For styling and layout.
## JavaScript: For functionality (user authentication, task management, reminders, clock).
## LocalStorage: For storing tasks and user data.

## To-Do List Section

## Future Enhancements
## Task Priority: Add task priority levels (e.g., High, Medium, Low).
## Recurring Tasks: Implement the ability to set recurring tasks.
## Dark Mode: Implement a dark mode toggle.
## Better Styling: Improve the design with animations and transitions.
 
