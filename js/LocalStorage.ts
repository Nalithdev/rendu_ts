import Category from "./Category";
import Task from "./Task";

class LocalStorage {

    tasklist:Task[] = [];
    


    constructor(private _listTasks:Task[]) {
        this.tasklist = _listTasks;
        

    }

    public static createTask(task: { titre: string; description: string; date: string; level: string; id: number; category:Category}):void {
        console.log("createTask");
        console.log(task);
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(task);
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }


    public static selectAll():Task[] {
        console.log('selectAll')
        let tasks = localStorage.getItem('tasks');
        if(tasks) {
            return JSON.parse(tasks);
        }
        return [];
    }

    public static deleteTask(id: number):void {
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        let index = tasks.findIndex((t:Task) => t.id === id);
        console.log(index);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }

    public static deleteAllTask():void {

    }

    public static updateTask(task:{ titre: string; description: string; date: string; level: string; id: number; category:Category}):void 
    {

        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        console.log(task.id);
        let index = tasks.findIndex((t:Task) => t.id === task.id);
        console.log(index);
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    public static createCategory(category: { title: string; id: number }):void {
        let categories = JSON.parse(localStorage.getItem("categories") || "[]");
        categories.push(category);
        localStorage.setItem("categories", JSON.stringify(categories));
    }
    public static selectAllCategories():Category[] {
        let categories = localStorage.getItem('categories');
        if(categories) {
            return JSON.parse(categories);
        }
        return [];
    }
}

export default LocalStorage;