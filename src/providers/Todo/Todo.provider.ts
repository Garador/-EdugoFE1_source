import { action, computed, observable } from "mobx";
import { TodoObservable, TodoStore } from "../../stores/TodoStore/Todo.store";
import { ITodoEditForm, ITodoImportElement } from "../../types/todo";
import * as axios from 'axios'
import moment from "moment";

/**
 * Handles the todo operations.
 */
export class TodoProvider {
    /**
     * The store that holds the todos.
     */
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

    /**
     * Creates and adds new todo.
     * @param formData The data to be used to create the new todo.
     */
    @action
    makeTodo(formData: ITodoEditForm):void{
        formData.first_sighting_at = this.parseInputDate(formData.first_sighting_at+"");

        let newTodo = new TodoObservable();
        newTodo.title = formData.title;
        newTodo.description = formData.description;
        newTodo.finished = formData.finished;
        newTodo.first_sighting_at = <Date> formData.first_sighting_at;
        this.store.todos.push(newTodo);
    }

    /**
     * Updates the todo.
     * @param todoId The todo to edit.
     * @param formData The form data.
     */
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

    /**
     *  Deletes the selected todo.
     * @param todoId The todo ID
     */
    @action
    deleteTodo(todoId:string):void{
        this.store.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    /**
     *  Deletes the selected todos.
     * @param todoIds The todo IDs
     */
    @action
    deleteSeveralTodos(todoIds:string[]):void{
        this.store.todos = this.todos.filter(todo => todoIds.indexOf(todo.id) < 0);
    }

    /**
     *  Checks the selected todo.
     * @param todoId The todo ID
     */
    @action
    checkTodo(todoId: string){
        const todo = this.store.todos.find(todo => todoId === todo.id);
        if(todo){
            todo.finished = !todo.finished;
        }else{
            throw new Error("Invalid check: todo not found.");
        }
    }

    /**
     * Checks the selected todos.
     * @param todoIds The todo IDs
     */
    @action
    checkSeveralTodos(todoIds: string[]){
        try{
            const selected = this.store.todos.filter(todo => todoIds.indexOf(todo.id) > -1);
            selected.forEach(element => {
                element.finished = !element.finished;
            })
        }catch(e){
            throw new Error("Error checking several todos...");
        }
    }

    /**
     * Sets whether a new row is being added or not
     * @param isAdding Whether it's adding
     */
    @action
    setIsAddingNewRow(isAdding:boolean){
        this.store.addingNewRow = isAdding;
    }

    /**
     * Sets the editing todo.
     * @param todoId The todo ID
     * @param editing Whether it's editing or not the ID
     */
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

    /**
     * Sets the selected todo as beign edited.
     * @param todoId The todo ID
     * @param fullView Whether it's on full view
     */
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

    /**
     * If it's currently adding a new todo
     */
    @computed
    get isAddingTodo(){
        return !!this.store.addingNewRow;
    }

    /**
     * If it's currently editing a new todo
     */
    @computed
    get isEditingTodo(){
        //return false;
        return !!this.editing;
    }

    /**
     * If it's currently showing a todo on full view
     */
    @computed
    get isTodoInFullView(){
        //return false;
        return !!this.fullView;
    }

    /**
     * Gets the todo being edited
     */
    @computed
    get editingTodo(){
        return this.editing;
    }


    /**
     * Gets the todos
     */
    @computed
    get todos():TodoObservable[]{
        return this.store.todos;
    }

    /**
     * Loads the mock todos.
     */
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
        this.store.todos.push(...newTodos);
    }

    /**
     * Formats the date on a specific way to adapt to be used on an input field
     * of type date.
     * @param dateValue The date
     * @returns The formatted date
     */
    getInputDate(dateValue: Date){
        return moment(dateValue).format("YYYY-MM-DD");
    }

    /**
     * Parses the date from an input field to a date object.
     * @param dateValue The input field date value
     * @returns The date.
     */
    parseInputDate(dateValue: string){
        return moment(dateValue, "YYYY-MM-DD").toDate();
    }
    
}