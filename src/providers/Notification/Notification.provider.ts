import { action, computed, observable } from "mobx";
import { NotificationStore, Notification } from "../../stores/Notification/Notification.store";
import { ENotificationType } from "../../types/notification";

export class NotificationProvider {
    store: NotificationStore;
    
    constructor(store: NotificationStore){
        this.store = store;
    }


    @action
    addNotification(title: string, description: string, type: ENotificationType, durationMillis:number = 3000){
        let notification = new Notification();
        notification.description = description;
        notification.title = title;
        notification.type = type;
        notification.isShowing = true;
        notification.shownAt = new Date();
        this.store.notifications.push(notification);
        setTimeout(()=>{
            notification.isShowing = false;
        }, durationMillis);
    }

    @action
    showNotification(notificationID: string){
        const notification = this.store.notifications.find(notification => notification.id === notificationID);
        if(notification){
            notification.isShowing = true;
        }
    }

    @action
    hideNotification(notificationID: string){
        const notification = this.store.notifications.find(notification => notification.id === notificationID);
        if(notification){
            notification.isShowing = false;
        }
    }

    @action
    removeNotification(notificationID: string){
        this.store.notifications = this.store.notifications.filter(notification => notification.id !== notificationID);
    }

    @computed
    get shownNotifications(){
        return this.store.notifications.filter(element => element.isShowing);
    }

}