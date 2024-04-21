
/// CRUD

import Category from "./Category";
import Task from "./Task";
import LocalStorage from "./LocalStorage";

    // ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE

    let modifyForm = document.getElementById('modifyTaskForm');
    console.log(modifyForm);
    let task = document.getElementById('tasks');

writeTacks();
createTaskForm()

    function writeTacks() {
        let taskList = document.getElementById('tasks');
        
        let tasks: Task[] = LocalStorage.selectAll();
        console.log(tasks);
        if (taskList) {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                if(task.level === 'low'){
                    taskList.innerHTML += `<div class="task low">
                    <h3>${task.titre} <span>– ${task.level}</span></h3>
                    <p>Date d'échéance: ${task.date}</p>
                    <p>${task.description}</p>
                    <button type=button" id="delete" value="${task.id}">Supprimer</button>
                    <button class="edit-btn" value="${task.id}">Modifier</button>
                </div>`;
                } 
                else if(task.level === 'medium'){
                    taskList.innerHTML += `<div class="task medium">
                    <h3>${task.titre} <span>– ${task.level}</span></h3>
                    <p>Date d'échéance: ${task.date}</p>
                    <p>${task.description}</p>
                    <button type=button" id="delete" value="${task.id}">Supprimer</button>
                    <button class="edit-btn" value="${task.id}">Modifier</button>
                </div>`;
                }
                else if(task.level === 'high'){
                taskList.innerHTML += `<div id="tasks"><div class="task high">
                    <h3>${task.titre} <span>– ${task.level}</span></h3>
                    <p>Date d'échéance: ${task.date}</p>
                    <p>${task.description}</p>
                    <button type=button" id="delete" value="${task.id}">Supprimer</button>
                    <button class="edit-btn"value="${task.id}">Modifier</button>
                </div></div>`;
                }


        });
        task = document.getElementById('tasks');
    }
    
}








    // CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE
    

    // CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE
    task?.addEventListener('click', function(e){
        let target = e.target as HTMLElement;
        if(target.className === 'edit-btn'){
            let id = parseInt(target.getAttribute('value') || '0');
            let task = LocalStorage.selectAll().find(t => t.id === id);
            if(task){
                console.log(task);
                if(modifyForm){
                    modifyForm.innerHTML = `
                        <input type="text" id="modifyTaskTitle" value="${task.titre}">
                        <input type="text" id="modifyTaskDescription" value="${task.description}">
                        <input type="date" id="modifyTaskDueDate" value="${task.date}">
                        <select id="modifyTaskPriority">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <button type="submit">Modifier</button>
                        <input type="hidden" id="modifyTaskId" value="${task.id}">
                        <input type="hidden" id="modifyTaskCategory" value="${task.category}">
                    `;
                }


                // task.modifyTask();
            }
        }
    });


    modifyForm?.addEventListener('submit', function(e){
        e.preventDefault();
        console.log('submit');
        let titre = (<HTMLInputElement>document.getElementById('modifyTaskTitle')).value;
        let description = (<HTMLInputElement>document.getElementById('modifyTaskDescription')).value;
        let date = (<HTMLInputElement>document.getElementById('modifyTaskDueDate')).value;
        let level = (<HTMLInputElement>document.getElementById('modifyTaskPriority')).value;
        let id = parseInt((<HTMLInputElement>document.getElementById('modifyTaskId')).value);
        let task = LocalStorage.selectAll().find(t => t.id === id);
        let category = task?.category;
        LocalStorage.updateTask({titre, description, date, level, id, category});
        writeTacks();
        modifyForm.innerHTML = '';
    });


    // CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE


    task?.addEventListener('click', function(e){
        let target = e.target as HTMLElement;
        if(target.id === 'delete'){
            let id = parseInt(target.getAttribute('value') || '0');
            LocalStorage.deleteTask(id);
            writeTacks();
        }
    }); 

let catForm = document.getElementById('catForm');
catForm?.addEventListener('submit', function(e){
    e.preventDefault();
    let title = (<HTMLInputElement>document.getElementById('catTitle')).value;
    let category = new Category(title);
    category.createCategory();
    writeTacks();
});


// J'APPLIQUE UN FILTRE
let filter = document.getElementById('filterForm');
filter?.addEventListener('change', function(e){
    console.log('change');
    let priority = (<HTMLInputElement>document.getElementById('filterPriority')).value;
    let tasks = LocalStorage.selectAll();
    let taskList = document.getElementById('tasks');
    let date = (<HTMLInputElement>document.getElementById('filterDate')).value;
    console.log(date);
    if(priority === 'all' && date === ''){
        writeTacks();
        return;
    }

    if(taskList){
        taskList.innerHTML = '';
        tasks.forEach(task => {
            if(task.level === priority && task.level === 'low'){
                taskList.innerHTML += `<div class="task low">
                <h3>${task.titre} <span>– ${task.level}</span></h3>
                <p>Date d'échéance: ${task.date}</p>
                <p>${task.description}</p>
                <button type=button" id="delete" value="${task.id}">Supprimer</button>
                <button class="edit-btn" value="${task.id}">Modifier</button>
            </div>`;
            }
            else if(task.level === priority && task.level === 'medium'){
                taskList.innerHTML += `<div class="task medium">
                <h3>${task.titre} <span>– ${task.level}</span></h3>
                <p>Date d'échéance: ${task.date}</p>
                <p>${task.description}</p>
                <button type=button" id="delete" value="${task.id}">Supprimer</button>
                <button class="edit-btn" value="${task.id}">Modifier</button>
            </div>`;

        }
        else if(task.level === priority && task.level === 'high'){
            taskList.innerHTML += `<div class="task high">
                <h3>${task.titre} <span>– ${task.level}</span></h3>
                <p>Date d'échéance: ${task.date}</p>
                <p>${task.description}</p>
                <button type=button" id="delete" value="${task.id}">Supprimer</button>
                <button class="edit-btn" value="${task.id}">Modifier</button>
            </div>`;
        }
    
    });
    // filtrer par date
    if(date !== ''){
        taskList.innerHTML = '';
        tasks.forEach(task => {
            console.log(task.date);
            if(task.date === date && task.level === 'low'){
                taskList.innerHTML += `<div class="task low">
                <h3>${task.titre} <span>– ${task.level}</span></h3>
                <p>Date d'échéance: ${task.date}</p>
                <p>${task.description}</p>
                <button type=button" id="delete" value="${task.id}">Supprimer</button>
                <button class="edit-btn" value="${task.id}">Modifier</button>
            </div>`;
            }
            else if(task.date === date && task.level === 'medium'){
                taskList.innerHTML += `<div class="task medium">
                <h3>${task.titre} <span>– ${task.level}</span></h3>
                <p>Date d'échéance: ${task.date}</p>
                <p>${task.description}</p>
                <button type=button" id="delete" value="${task.id}">Supprimer</button>
                <button class="edit-btn" value="${task.id}">Modifier</button>
            </div>`;

        }
        else if(task.date === date && task.level === 'high'){
            taskList.innerHTML += `<div class="task high">
                <h3>${task.titre} <span>– ${task.level}</span></h3>
                <p>Date d'échéance: ${task.date}</p>
                <p>${task.description}</p>
                <button type=button" id="delete" value="${task.id}">Supprimer</button>
                <button class="edit-btn" value="${task.id}">Modifier</button>
            </div>`;
        }
    });
    }

}
 
    
    
});




let form = document.getElementById('taskForm');
form?.addEventListener('submit', function(e){
    e.preventDefault();
    let titre = (<HTMLInputElement>document.getElementById('taskTitle')).value;
    let description = (<HTMLInputElement>document.getElementById('taskDescription')).value;
    let date = (<HTMLInputElement>document.getElementById('taskDueDate')).value;
    let level = (<HTMLInputElement>document.getElementById('taskPriority')).value;
    let category = (<HTMLInputElement>document.getElementById('taskCategory')).value;
    let task : Task = new Task(titre, description, date, level, new Category(category));
    task.createTask();
    writeTacks();
});

writeTacks()

function createTaskForm() {
    let form = document.getElementById('taskForm');
    if(form){
        form.innerHTML = `
        <input type="text" id="taskTitle" placeholder="Titre de la tâche" required>
        <textarea id="taskDescription" placeholder="Description de la tâche"></textarea>
        <input type="date" id="taskDueDate">
        <select id="taskPriority">
            <option value="low">Faible</option>
            <option value="medium" selected>Moyenne</option>
            <option value="high">Haute</option>
        </select>
        <button type="submit">Ajouter Tâche</button>
        `;
        let Categoryfromlocalstorage = LocalStorage.selectAllCategories();
        console.log(Categoryfromlocalstorage);
        let select = document.createElement('select');
        select.id = 'taskCategory';
        Categoryfromlocalstorage.forEach(category => {
            let option = document.createElement('option');
            option.value = category.title;
            option.innerText = category.title;
            select.appendChild(option);
        });
        form.appendChild(select);
    }
}
