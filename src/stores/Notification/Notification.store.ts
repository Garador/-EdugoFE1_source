import { observable } from "mobx";
import { ENotificationType } from "../../types/notification";

/**
 * This is the notification element.
 */
export class Notification {
    @observable
    title: string = "";

    @observable
    isShowing: boolean = false;

    @observable
    description: string = "";

    @observable
    shownAt: Date = new Date();

    /**
     * This is not meant to change once the object has been created.
     */
    id:string = Math.floor(Math.random()*1e10).toString(32);

    /**
     * This is not meant to change once the object has been created.
     */
    type: ENotificationType = ENotificationType.INFO;
}

/**
 * This is the notification store.
 */
export class NotificationStore {
    @observable
    notifications: Notification[] = [];
}


const NotificationStoreInstance = new NotificationStore();
export {NotificationStoreInstance}