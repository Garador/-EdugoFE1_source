import { action, computed, observable } from "mobx";
import moment from 'moment';
import { ITodoEditForm } from "../../types/todo";
export class TodoObservable {
    @observable
    title: string = "";
    @observable
    finished: boolean = false;
    @observable
    description: string = "";
    id:string = Math.floor(Math.random()*1e10).toString(32);
    //Whether this store is being edited.
    /*@observable
    editing: boolean = false;
    //Whether this element is being displayed in full view
    @observable
    fullView: boolean = false;
    */
    @observable
    first_sighting_at: Date = new Date();

    @computed
    get displayFS(){
        return this.first_sighting_at ? moment(this.first_sighting_at).format("MMM Do YYYY") : "No date";
    }

}

export class TodoStore {
    @observable
    todos: TodoObservable[] = [];

    @observable
    addingNewRow: boolean = false;

    @action
    addNewTodo(data: ITodoEditForm){
        let newTodo = new TodoObservable();
        newTodo.title = data.title;
        newTodo.description = data.description;
        newTodo.finished = data.finished;
        newTodo.first_sighting_at = <Date> data.first_sighting_at;
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

    @action
    addSeveral(todo: TodoObservable[]){
        this.todos.push(...todo);
    }
}


const TodoStoreInstance = new TodoStore();
export {TodoStoreInstance}