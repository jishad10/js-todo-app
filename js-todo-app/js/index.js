import { Todo } from "./classes/Todo.js";


// find the elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


// showMessage
const showMessage = (text, status) => {                   //text dekacchi & ekta status dekacchi je success naki success noi
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);           //eikahne bg er satatus onosary ekta class assign hobe ja already css class e made kora aace
  setTimeout(() => {
    messageElement.textContent = "";                      //ekta somoy por texta remove hoi e jabe & color tao
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};


// createTodo
const createTodo = (newTodo) => {
  const todoElement = document.createElement("li");         //ekta list made korsi ja ul er modde thakbe
  todoElement.id = newTodo.todoId;                          //then todoid ta add korteche ,,,mani local-s er id er modde raktechi
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
    <span> ${newTodo.todoValue} </span>       
    <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"> </i> </button> </span>
  `;                                                        //todo er value ta dekabe and button dekabe
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};


// deleteTodo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;  //list kotahi aace ta koje nicchi ,ei kane jodi parentelemnt ekta di to taile just button ke return korto

  todoLists.removeChild(selectedTodo);                                          //ey particular list ta delete ko re di be 
  showMessage("todo is deleted", "danger");                                     //ekta message dekabe & status dekabe

  let todos = getTodosFromLocalStorage();                                       //ei khane load korar karon hocce not selected id golo theke jabe/return hobe & er upo re selected id ta delete ko re dichi
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};



// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")            //ekta key set ko re dichi mytodos ekhane id & value aace kina dekbo
    ? JSON.parse(localStorage.getItem("mytodos"))   //jodi thake taile ta return korbe & actually data golo ke json format e parse ko re ni te hoi
    : [];                                           //naile empty array return korbe
};



// addTodo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;                //todo input er value ta koje nicchi, mani text er value ta ke reke dicchi

  // unique id
  const todoId = Date.now().toString();             //date.now ey function er maddome amra unique id genarte korte parbo
  const newTodo = new Todo(todoId, todoValue);      //amra je todo class ta nicilam oi ta te value pass kortechi

  createTodo(newTodo);
  showMessage("todo is added", "success");

  // add todo to localStorage
  const todos = getTodosFromLocalStorage();
  todos.push(newTodo);                                       //array er modde todo golo push korbo ekta key er under e & ey list golo show korbe
  localStorage.setItem("mytodos", JSON.stringify(todos));    //then item ta ke local_s e set ko re rakbo

  todoInput.value = "";                                      //jokon store hoi e jabe tokon input field ta te kono value thakbe nah
};



// loadTodos ...mani refresh diwar por ja theke jabe arki
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo));                 //ekta todo create korsi then ei ta createaTodo function er maddome patai dichi 
};                                                       //then newTodo ta todo ke assign korbe taile newTodo er id, value golo pabo


// adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);  //DOMContentLoaded ekta event ja moloto dataload korte use hoi
