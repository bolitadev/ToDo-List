const button = document.querySelector(".cssbuttons-io-button");
const input = document.querySelector(".input-task");
const listTasks = document.querySelector(".list-tasks");

let myItemsList = [];

button.addEventListener("click", addTask);

function addTask() {
  myItemsList.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = '';

  showTasks();
  saveTasksToLocal();
}

function showTasks() {
  let newList = '';
  myItemsList.forEach((task, index) => {
    newList += `
      <li class="task ${task.concluida ? 'done' : ''}">
        <img src="./img/checked.png" alt="check-da-tarefa" height="25px" onclick="checkTask('${index}')"/>
        <p>${task.tarefa}</p>
        <img src="./img/trash.png" alt="deletar-tarefa" height="25px" onclick="deleteTask(${index})">
      </li>`;
  });
  listTasks.innerHTML = newList;
}

function saveTasksToLocal() {
  localStorage.setItem('tasks', JSON.stringify(myItemsList));
}

function reloadTasks() {
  const taskFromLocalStorage = localStorage.getItem('tasks');
  if (taskFromLocalStorage) {
    myItemsList = JSON.parse(taskFromLocalStorage);
    showTasks();
  }
}

reloadTasks();

function checkTask(index) {
  myItemsList[index].concluida = !myItemsList[index].concluida;
  showTasks();
  saveTasksToLocal();
}

function deleteTask(index) {
  myItemsList.splice(index, 1);
  showTasks();
  saveTasksToLocal();
}

// Adiciona evento de "enter" no campo de entrada
input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) { // Código da tecla Enter
    addTask();
  }
});