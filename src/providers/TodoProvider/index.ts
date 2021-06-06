import { action, computed } from "mobx";
import { TodoObservable, TodoStore } from "../../stores/TodoStore";

export class TodoProvider {
    store: TodoStore;
    
    constructor(store: TodoStore){
        this.store = store;
    }

    @action
    makeTodo(title: string, description: string):void{
        this.store.addNewTodo(title, description);
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
    setIsAddingNewRow(){
        this.store.addingNewRow = true;
    }

    @action
    setIsNotAddingNewRow(){
        this.store.addingNewRow = false;
    }

    @computed
    get isAddingTodo(){
        return this.store.addingNewRow;
    }

    @computed
    get todos():TodoObservable[]{
        return this.store.todos;
    }
}