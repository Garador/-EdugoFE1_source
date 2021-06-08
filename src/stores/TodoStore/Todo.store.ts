import { computed, observable } from "mobx";
import moment from 'moment';
/**
 * Handles the Todo object.
 */
export class TodoObservable {
    @observable
    title: string = "";
    @observable
    finished: boolean = false;
    @observable
    description: string = "";
    /**
     * This field is not meant to change, and thus, not be an observable.
     */
    id:string = Math.floor(Math.random()*1e10).toString(32);
    @observable
    first_sighting_at: Date = new Date();

    @computed
    get displayFS(){
        return this.first_sighting_at ? moment(this.first_sighting_at).format("MMM Do YYYY") : "No date";
    }

}

/**
 * Handles the Todo store.
 */
export class TodoStore {
    @observable
    todos: TodoObservable[] = [];

    @observable
    addingNewRow: boolean = false;
}


const TodoStoreInstance = new TodoStore();
export {TodoStoreInstance}