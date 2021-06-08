import { computed, observable } from "mobx";
import { ENotificationType } from "../../types/notification";

export class Notification {
    @observable
    title: string = "";

    @observable
    isShowing: boolean = false;

    @observable
    description: string = "";

    @observable
    shownAt: Date = new Date();

    id:string = Math.floor(Math.random()*1e10).toString(32);
    type: ENotificationType = ENotificationType.INFO;
}

export class NotificationStore {
    @observable
    notifications: Notification[] = [];
}


const NotificationStoreInstance = new NotificationStore();
export {NotificationStoreInstance}