import Category from "./Category";
import ITask from "./ITask";
import LocalStorage from "./LocalStorage";

class Task implements ITask{
    
    private _id:number;
    constructor(private _titre:string, private _description:string, private _date:string, private _level:string, private _category:Category){
        this._id = Date.now();
    }

    createTask() {
        console.log('createTask')
        console.log(this);
        let titre = this.titre
        console.log(titre)
        let description = this.description
        let level = this.level
        let date = this.date
        let id = this.id
        let category = this.category

        LocalStorage.createTask({titre, description, date, level, id, category });




    }
    
    deleteTask() {
        



    }

    modifyTask() {

    }
    get titre():string {
        return this._titre;
    }
    get description():string {
        return this._description;
    }
    get date():string {
        return this._date;
    }
    get level():string {
        return this._level;
    }
    get category():Category {
        return this._category;
    }
    get id():number{
        return this._id
    }



}

export default Task;