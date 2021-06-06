import { action, observable } from "mobx";


export class TodoObservable {
    @observable
    title: string = "";
    @observable
    finished: boolean = false;
    @observable
    description: string = "";
    id:string = Math.floor(Math.random()*1e10).toString(32);

}

export class TodoStore {
    @observable
    todos: TodoObservable[] = [];

    @observable
    addingNewRow: boolean = false;

    @action
    addNewTodo(title: string, description: string){
        let newTodo = new TodoObservable();
        newTodo.title = title;
        newTodo.description = description;
        this.todos.push(newTodo);
    }

    @action
    removeTodo(id: string){
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    @action
    markNewRow(isMakingNew:boolean){
        this.addingNewRow = isMakingNew;
    }
}


const TodoStoreInstance = new TodoStore();
export {TodoStoreInstance}