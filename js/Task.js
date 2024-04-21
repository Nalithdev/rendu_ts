import LocalStorage from "./LocalStorage.js";
var Task = /** @class */ (function () {
    function Task(_titre, _description, _date, _level, _category) {
        this._titre = _titre;
        this._description = _description;
        this._date = _date;
        this._level = _level;
        this._category = _category;
        this._id = Date.now();
    }
    Task.prototype.createTask = function () {
        console.log('createTask');
        console.log(this);
        var titre = this.titre;
        console.log(titre);
        var description = this.description;
        var level = this.level;
        var date = this.date;
        var id = this.id;
        var category = this.category;
        LocalStorage.createTask({ titre: titre, description: description, date: date, level: level, id: id, category: category });
    };
    Task.prototype.deleteTask = function () {
    };
    Task.prototype.modifyTask = function () {
    };
    Object.defineProperty(Task.prototype, "titre", {
        get: function () {
            return this._titre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "category", {
        get: function () {
            return this._category;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    return Task;
}());
export default Task;
