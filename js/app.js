/// CRUD
import Category from "./Category.js";
import Task from "./Task.js";
import LocalStorage from "./LocalStorage.js";
// ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE
var modifyForm = document.getElementById('modifyTaskForm');
console.log(modifyForm);
var task = document.getElementById('tasks');
writeTacks();
createTaskForm();
function writeTacks() {
    var taskList = document.getElementById('tasks');
    var tasks = LocalStorage.selectAll();
    console.log(tasks);
    if (taskList) {
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            if (task.level === 'low') {
                taskList.innerHTML += "<div class=\"task low\">\n                    <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                    <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                    <p>").concat(task.description, "</p>\n                    <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                    <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n                </div>");
            }
            else if (task.level === 'medium') {
                taskList.innerHTML += "<div class=\"task medium\">\n                    <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                    <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                    <p>").concat(task.description, "</p>\n                    <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                    <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n                </div>");
            }
            else if (task.level === 'high') {
                taskList.innerHTML += "<div id=\"tasks\"><div class=\"task high\">\n                    <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                    <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                    <p>").concat(task.description, "</p>\n                    <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                    <button class=\"edit-btn\"value=\"").concat(task.id, "\">Modifier</button>\n                </div></div>");
            }
        });
        task = document.getElementById('tasks');
    }
}
// CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE
// CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE
task === null || task === void 0 ? void 0 : task.addEventListener('click', function (e) {
    var target = e.target;
    if (target.className === 'edit-btn') {
        var id_1 = parseInt(target.getAttribute('value') || '0');
        var task_1 = LocalStorage.selectAll().find(function (t) { return t.id === id_1; });
        if (task_1) {
            console.log(task_1);
            if (modifyForm) {
                modifyForm.innerHTML = "\n                        <input type=\"text\" id=\"modifyTaskTitle\" value=\"".concat(task_1.titre, "\">\n                        <input type=\"text\" id=\"modifyTaskDescription\" value=\"").concat(task_1.description, "\">\n                        <input type=\"date\" id=\"modifyTaskDueDate\" value=\"").concat(task_1.date, "\">\n                        <select id=\"modifyTaskPriority\">\n                            <option value=\"high\">High</option>\n                            <option value=\"medium\">Medium</option>\n                            <option value=\"low\">Low</option>\n                        </select>\n                        <button type=\"submit\">Modifier</button>\n                        <input type=\"hidden\" id=\"modifyTaskId\" value=\"").concat(task_1.id, "\">\n                        <input type=\"hidden\" id=\"modifyTaskCategory\" value=\"").concat(task_1.category, "\">\n                    ");
            }
            // task.modifyTask();
        }
    }
});
modifyForm === null || modifyForm === void 0 ? void 0 : modifyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('submit');
    var titre = document.getElementById('modifyTaskTitle').value;
    var description = document.getElementById('modifyTaskDescription').value;
    var date = document.getElementById('modifyTaskDueDate').value;
    var level = document.getElementById('modifyTaskPriority').value;
    var id = parseInt(document.getElementById('modifyTaskId').value);
    var task = LocalStorage.selectAll().find(function (t) { return t.id === id; });
    var category = task === null || task === void 0 ? void 0 : task.category;
    LocalStorage.updateTask({ titre: titre, description: description, date: date, level: level, id: id, category: category });
    writeTacks();
    modifyForm.innerHTML = '';
});
// CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE
task === null || task === void 0 ? void 0 : task.addEventListener('click', function (e) {
    var target = e.target;
    if (target.id === 'delete') {
        var id = parseInt(target.getAttribute('value') || '0');
        LocalStorage.deleteTask(id);
        writeTacks();
    }
});
var catForm = document.getElementById('catForm');
catForm === null || catForm === void 0 ? void 0 : catForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = document.getElementById('catTitle').value;
    var category = new Category(title);
    category.createCategory();
    writeTacks();
});
// J'APPLIQUE UN FILTRE
var filter = document.getElementById('filterForm');
filter === null || filter === void 0 ? void 0 : filter.addEventListener('change', function (e) {
    console.log('change');
    var priority = document.getElementById('filterPriority').value;
    var tasks = LocalStorage.selectAll();
    var taskList = document.getElementById('tasks');
    var date = document.getElementById('filterDate').value;
    console.log(date);
    if (priority === 'all' && date === '') {
        writeTacks();
        return;
    }
    if (taskList) {
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            if (task.level === priority && task.level === 'low') {
                taskList.innerHTML += "<div class=\"task low\">\n                <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                <p>").concat(task.description, "</p>\n                <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n            </div>");
            }
            else if (task.level === priority && task.level === 'medium') {
                taskList.innerHTML += "<div class=\"task medium\">\n                <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                <p>").concat(task.description, "</p>\n                <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n            </div>");
            }
            else if (task.level === priority && task.level === 'high') {
                taskList.innerHTML += "<div class=\"task high\">\n                <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                <p>").concat(task.description, "</p>\n                <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n            </div>");
            }
        });
        // filtrer par date
        if (date !== '') {
            taskList.innerHTML = '';
            tasks.forEach(function (task) {
                console.log(task.date);
                if (task.date === date && task.level === 'low') {
                    taskList.innerHTML += "<div class=\"task low\">\n                <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                <p>").concat(task.description, "</p>\n                <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n            </div>");
                }
                else if (task.date === date && task.level === 'medium') {
                    taskList.innerHTML += "<div class=\"task medium\">\n                <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                <p>").concat(task.description, "</p>\n                <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n            </div>");
                }
                else if (task.date === date && task.level === 'high') {
                    taskList.innerHTML += "<div class=\"task high\">\n                <h3>".concat(task.titre, " <span>\u2013 ").concat(task.level, "</span></h3>\n                <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n                <p>").concat(task.description, "</p>\n                <button type=button\" id=\"delete\" value=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" value=\"").concat(task.id, "\">Modifier</button>\n            </div>");
                }
            });
        }
    }
});
var form = document.getElementById('taskForm');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    var titre = document.getElementById('taskTitle').value;
    var description = document.getElementById('taskDescription').value;
    var date = document.getElementById('taskDueDate').value;
    var level = document.getElementById('taskPriority').value;
    var category = document.getElementById('taskCategory').value;
    var task = new Task(titre, description, date, level, new Category(category));
    task.createTask();
    writeTacks();
});
writeTacks();
function createTaskForm() {
    var form = document.getElementById('taskForm');
    if (form) {
        form.innerHTML = "\n        <input type=\"text\" id=\"taskTitle\" placeholder=\"Titre de la t\u00E2che\" required>\n        <textarea id=\"taskDescription\" placeholder=\"Description de la t\u00E2che\"></textarea>\n        <input type=\"date\" id=\"taskDueDate\">\n        <select id=\"taskPriority\">\n            <option value=\"low\">Faible</option>\n            <option value=\"medium\" selected>Moyenne</option>\n            <option value=\"high\">Haute</option>\n        </select>\n        <button type=\"submit\">Ajouter T\u00E2che</button>\n        ";
        var Categoryfromlocalstorage = LocalStorage.selectAllCategories();
        console.log(Categoryfromlocalstorage);
        var select_1 = document.createElement('select');
        select_1.id = 'taskCategory';
        Categoryfromlocalstorage.forEach(function (category) {
            var option = document.createElement('option');
            option.value = category.title;
            option.innerText = category.title;
            select_1.appendChild(option);
        });
        form.appendChild(select_1);
    }
}
