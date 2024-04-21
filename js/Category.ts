import ICategory from './ICategory';
import LocalStorage from './LocalStorage';
class Category implements ICategory{

    private id:number;
    constructor(private _title:string, ) {
        this.id = Date.now();
        
    }
    get title():string {
        return this._title;
    }

    createCategory() {
        let title = this.title;
        let id = this.id;
        LocalStorage.createCategory({title, id});
    }

}



export default Category;