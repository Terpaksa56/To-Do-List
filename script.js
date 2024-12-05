var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);
function addToDoItem(){
    alert("Add button Clicked!")
}
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if(completed){
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
 }

 function addToDoItem(){
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
 }

 function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    } else{
        this.classList.add("completed");
    }
 }

 function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    toDoList.innerHTML = "";
}
 var myArray = [];
 myArray.push("something to store");
 myArray.push("something else to store");
 alert(myArray[0]);

 var toDoInfo = {
    "task": "Thing I neet to do",
    "completed": false
 };

 function saveList() {
    var toDos = [];
    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log("Data to-do list disimpan di localStorage: ", localStorage.getItem("toDos"));
}
function loadList() {
    var storedToDos = localStorage.getItem("toDos");
    if (storedToDos !== null) {
        var toDos = JSON.parse(storedToDos);
        toDoList.innerHTML = ""; // Mengosongkan list saat memuat data baru
        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    } else {
        emptyList(); // Mengosongkan list jika tidak ada data tersimpan
    }
    console.log("Data to-do list disimpan di localStorage: ", localStorage.getItem("toDos"));

}

// Menambahkan event listener untuk event beforeunload
window.addEventListener("beforeunload", function() {
    localStorage.removeItem("toDos");
});

// Memuat data to-do list saat halaman dimuat ulang
window.addEventListener("load", loadList);


loadList();