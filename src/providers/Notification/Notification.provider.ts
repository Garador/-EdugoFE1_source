import { action, computed, observable } from "mobx";
import { NotificationStore, Notification } from "../../stores/Notification/Notification.store";
import { ENotificationType } from "../../types/notification";

/**
 * Handles the notification functions.
 */
export class NotificationProvider {
    /**
     * The notification store.
     */
    store: NotificationStore;
    
    constructor(store: NotificationStore){
        this.store = store;
    }


    /**
     * Adds a new notification.
     * @param title The notification title.
     * @param description The notification description.
     * @param type The type of notification.
     * @param durationMillis The duration in millis.
     */
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

    /**
     * Shows a particular notification (marks it as beign shown)
     * @param notificationID The notification to show
     */
    @action
    showNotification(notificationID: string){
        const notification = this.store.notifications.find(notification => notification.id === notificationID);
        if(notification){
            notification.isShowing = true;
        }
    }

    /**
     * Hides the specific notification (marks it as not showing)
     * @param notificationID The notification to hide
     */
    @action
    hideNotification(notificationID: string){
        const notification = this.store.notifications.find(notification => notification.id === notificationID);
        if(notification){
            notification.isShowing = false;
        }
    }

    /**
     * Removes the selected notification
     * @param notificationID The notification ID
     */
    @action
    removeNotification(notificationID: string){
        this.store.notifications = this.store.notifications.filter(notification => notification.id !== notificationID);
    }

    /**
     * Shows the specific notification.
     */
    @computed
    get shownNotifications(){
        return this.store.notifications.filter(element => element.isShowing);
    }

}