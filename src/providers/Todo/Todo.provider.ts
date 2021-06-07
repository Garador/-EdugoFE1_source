import { action, computed, observable } from "mobx";
import { TodoObservable, TodoStore } from "../../stores/TodoStore/Todo.store";
import { ITodoEditForm, ITodoImportElement } from "../../types/todo";
import * as axios from 'axios'
import moment from "moment";

export class TodoProvider {
    store: TodoStore;
    
    @observable
    editing?: TodoObservable;

    @observable
    fullView?: TodoObservable;
    
    constructor(store: TodoStore){
        this.store = store;
        this.editing = <any> null;
        this.fullView = <any> null;
    }

    @action
    makeTodo(formData: ITodoEditForm):void{
        formData.first_sighting_at = this.parseInputDate(formData.first_sighting_at+"");
        this.store.addNewTodo(formData);
    }

    @action
    updateTodo(todoId:string, formData: ITodoEditForm):void{
        const todo = this.store.todos.find(todo => todoId === todo.id);
        
        if(todo){
            formData.first_sighting_at = this.parseInputDate(formData.first_sighting_at+"");
            todo.title = formData.title;
            todo.description = formData.description;
            todo.finished = formData.finished;
            todo.first_sighting_at = formData.first_sighting_at;
        }else{
            throw new Error("Invalid check: todo not found.");
        }
    }

    @action
    deleteTodo(todoId:string):void{
        this.store.removeTodo(todoId);
    }

    @action
    checkTodo(todoId: string){
        const todo = this.store.todos.find(todo => todoId === todo.id);
        if(todo){
            todo.finished = !todo.finished;
        }else{
            throw new Error("Invalid check: todo not found.");
        }
    }

    @action
    setIsAddingNewRow(isAdding:boolean){
        this.store.addingNewRow = isAdding;
    }

    @action
    setEditingTodo(todoId: string, editing: boolean){
        let todo = this.store.todos.find(element => element.id === todoId);
        if(todo){
            if(editing){
                this.editing = todo;
            }else{
                this.editing = <any>null;
            }
        }else{
            throw new Error("Invalid check: todo not found.");
        }
    }

    @action
    setFullViewTodo(todoId: string, fullView:boolean){
        let todo = this.store.todos.find(element => element.id === todoId);
        if(todo){
            if(fullView){
                this.fullView = todo;
            }else{
                this.fullView = <any>null;
            }
        }else{
            throw new Error("Invalid check: todo not found.");
        }
    }

    @computed
    get isAddingTodo(){
        return !!this.store.addingNewRow;
    }

    @computed
    get isEditingTodo(){
        //return false;
        return !!this.editing;
    }

    @computed
    get isTodoInFullView(){
        //return false;
        return !!this.fullView;
    }

    @computed
    get editingTodo(){
        return this.editing;
    }

    @computed
    get todos():TodoObservable[]{
        return this.store.todos;
    }

    @action
    async loadMockTodos(){
        const data:ITodoImportElement[] = (await axios.default.get("https://api.mockaroo.com/api/01522f30?count=200&key=ea89fca0")).data;
        const newTodos = data.map(element => {
            let todoObservable = new TodoObservable();
            todoObservable.description = element.description;
            todoObservable.finished = element.tagged;
            todoObservable.first_sighting_at = new Date(element.first_sighting_at);
            todoObservable.title = element.name;
            return todoObservable;
        })
        this.store.addSeveral(newTodos);
    }

    getInputDate(dateValue: Date){
        return moment(dateValue).format("YYYY-MM-DD");
    }

    parseInputDate(dateValue: string){
        return moment(dateValue, "YYYY-MM-DD").toDate();
    }
    
}