document.addEventListener('DOMContentLoaded',()=>{
   const taskInput=document.getElementById("task-input");
   const taskList=document.getElementById("task-list");
   const addTaskBtn=document.getElementById("add-task-btn");

    addTaskBtn.addEventListener('click',addTask);

    function addTask(){
        const taskText=taskInput.value.trim();
        if(taskText)
        {
           const taskItem=createTaskElement(taskText);
            taskList.append(taskItem);
            taskInput.value="";
        }
    }

    function createTaskElement(text){
       const taskItem= document.createElement('li');
       taskItem.classList.add('task-item');
       taskItem.innerHTML=`<input type="checkbox" class="task-check-box">
                            <span>${text}</span>
                            <button class="delete-btn">Delete</button>`;
        return taskItem;

    }

    taskList.addEventListener('click',(event)=>{
        addCheckBoxChange(event);
        deleteTask(event);
    })

    function addCheckBoxChange(event){
        if(event.target.classList.contains('task-check-box'))
        {
            const span=event.target.nextElementSibling;
            if(event.target.checked)
            {
                span.classList.add('completed');
            }
            else{
                span.classList.remove('completed');
            }
        }
    }

    function deleteTask(event)
    {
        if(event.target.classList.contains('delet-btn'))
        {
            event.target.parentElement.remove();
        }
    }
    taskInput.addEventListener('click',(event)=>{
        if(event.key==='Enter')
        {
            addTask();
        }
    })
})
