const list = document.getElementById("tasks")
const btn = document.getElementById("add");
btn.addEventListener("click" , addTask);
document.getElementById("task").addEventListener("keypress" ,(e) => {

    if(e.key == "Enter"){
        addTask()
    }

});


function addTask(){
    const taskDetails = document.getElementById("task").value;
    if (taskDetails == "") return;
    const li = document.createElement("li");
    li.textContent = taskDetails
    console.log(taskDetails);
    document.getElementById("task").value = "";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener('click', () => li.remove());

    li.appendChild(delBtn);
    
    li.addEventListener('click', (e) => {
        if (e.target !== delBtn) li.classList.toggle('completed');
    });

    list.appendChild(li);

}