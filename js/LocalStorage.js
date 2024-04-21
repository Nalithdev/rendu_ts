var LocalStorage = /** @class */ (function () {
    function LocalStorage(_listTasks) {
        this._listTasks = _listTasks;
        this.tasklist = [];
        this.tasklist = _listTasks;
    }
    LocalStorage.createTask = function (task) {
        console.log("createTask");
        console.log(task);
        var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(task);
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    LocalStorage.selectAll = function () {
        console.log('selectAll');
        var tasks = localStorage.getItem('tasks');
        if (tasks) {
            return JSON.parse(tasks);
        }
        return [];
    };
    LocalStorage.deleteTask = function (id) {
        var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        var index = tasks.findIndex(function (t) { return t.id === id; });
        console.log(index);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    LocalStorage.deleteAllTask = function () {
    };
    LocalStorage.updateTask = function (task) {
        var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        console.log(task.id);
        var index = tasks.findIndex(function (t) { return t.id === task.id; });
        console.log(index);
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    LocalStorage.createCategory = function (category) {
        var categories = JSON.parse(localStorage.getItem("categories") || "[]");
        categories.push(category);
        localStorage.setItem("categories", JSON.stringify(categories));
    };
    LocalStorage.selectAllCategories = function () {
        var categories = localStorage.getItem('categories');
        if (categories) {
            return JSON.parse(categories);
        }
        return [];
    };
    return LocalStorage;
}());
export default LocalStorage;
