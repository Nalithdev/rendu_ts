import LocalStorage from './LocalStorage.js';
var Category = /** @class */ (function () {
    function Category(_title) {
        this._title = _title;
        this.id = Date.now();
    }
    Object.defineProperty(Category.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    Category.prototype.createCategory = function () {
        var title = this.title;
        var id = this.id;
        LocalStorage.createCategory({ title: title, id: id });
    };
    return Category;
}());
export default Category;
