// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Get tasks from localStorage
let tasks =JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderedTask(){

    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed',task.completed);
    

    const taskText = document.createElement('span');
    taskText.textContent = task.name;
    taskItem.appendChild(taskText);

    // Create checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click',()=> toggleCompletion(index));
    taskItem.appendChild(checkbox);
   
     // Create delete button
     const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.addEventListener('click', () => deleteTask(index));
     taskItem.appendChild(deleteButton);

     taskList.appendChild(taskItem);
    })
}

// Function to add a new task
taskForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(taskInput.value.trim()){
        const newTask = {
            name: taskInput.value.trim(),
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        saveTask();
        renderedTask();
    }
})

// Function to toggle task completion
function toggleCompletion(index){
    tasks[index].completed = !tasks[index].completed;
    saveTask();
    renderedTask();
}

// Function to delete a task
function deleteTask(index){
    tasks.splice(index, 1);
    saveTask();
    renderedTask();
}

// Function to save tasks to localStorage
function saveTask(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

renderedTask();