const form = document.querySelector('#task-form')
const newTask = document.querySelector('.task');
const taskInput = document.querySelector('.input-content');
const changeInputColor = document.querySelector('.alert-light');
const clearBTN = document.querySelector('.clearTask');
const filter = document.querySelector('.form-control')






//load function event listener

loadEventListeners();

//load all event listeners

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)

  // addTask
  form.addEventListener('submit', addTask);
  //clearTask
  clearBTN.addEventListener('click', clearAllTask);
  // RemoveTask
  newTask.addEventListener('click', removeTask);
  // Change DoneTask Color
  newTask.addEventListener('click', changeColor);

  // FilterTask
  filter.addEventListener('keyup', filterTask);

}

// get Task
function getTasks(){
  let tasks;

  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){

  const divElement = document.createElement('div');
  divElement.className = 'alert alert-light container';
  divElement.appendChild(document.createTextNode(task));
  const innerbutton = document.createElement('button');
  innerbutton.className = "close"
  innerbutton.innerHTML = '<i class="fa fa-remove"></i>';
  divElement.appendChild(innerbutton);
  newTask.appendChild(divElement);

  })
}




//Add task function

function addTask(e) {

  if (taskInput.value == '') {
    alert('Please, add a task')
  }

  const divElement = document.createElement('div');
  divElement.className = 'alert alert-light container';
  divElement.appendChild(document.createTextNode(taskInput.value));
  const innerbutton = document.createElement('button');
  innerbutton.className = "close"
  innerbutton.innerHTML = '<i class="fa fa-remove"></i>';
  divElement.appendChild(innerbutton);
  newTask.appendChild(divElement);

  // store task in local storage;
  storeTaskInLocalStorage(taskInput.value);

  //clear task

  taskInput.value = '';

  e.preventDefault();
}

//storeTaskInLocalStorage
function storeTaskInLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearAllTask(e) {
  while (newTask.firstChild) {
    newTask.removeChild(newTask.firstChild);
  }

}


function removeTask(e) {
  if (e.target.parentElement.classList.contains('close')) {
    if (confirm('Task will be deleted.')) {
      e.target.parentElement.parentElement.remove();

      //remove task from LS
     removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
  }
}

 //Remove task from localstorage

 function removeTaskFromLocalStorage(taskItem){

  console.log(taskItem)
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

   tasks.forEach(function(task, index){
     if(taskItem.textContent === task){
       tasks.splice(index, 1)
     }

   })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
 
function changeColor(e) {
  if (e.target.classList.contains('alert-light')) {
    const check = document.createElement('i');
    check.className = 'fas fa-check'
    e.target.style.backgroundColor = '#A6A6A6';
    e.target.style.color = '#fff';
    e.target.style.textDecoration = 'line-through';
    e.target.appendChild(check)

  }
}

//function filter task

function filterTask(e) {
  const text = e.target.value.toLowerCase();


  document.querySelectorAll('.alert-light').forEach(function (addedTask) {
    const item = addedTask.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      addedTask.style.display = 'block'
    } else {
      addedTask.style.display = 'none'
    }

  })

}
