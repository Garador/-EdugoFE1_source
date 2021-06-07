import React from 'react';
import { IndexPageContainer } from './index.container';
import { TodoStoreInstance } from '../../../stores/TodoStore/Todo.store';
import { Provider } from 'mobx-react';
import { TodoProvider } from '../../../providers/Todo/Todo.provider';
import { MockDataService } from '../../../rservice/MockDataService';
import { NotificationProvider } from '../../../providers/Notification/Notification.provider';
import { NotificationStoreInstance } from '../../../stores/Notification/Notification.store';
import { NotificationsComponent } from '../../shared/Notifications';


export class IndexPage extends React.Component<{path:any}> {

    todoProvider:TodoProvider;
    notificationProvider: NotificationProvider;
    
    constructor(props:any){
        super(props);
        this.todoProvider = new TodoProvider(TodoStoreInstance);
        this.notificationProvider = new NotificationProvider(NotificationStoreInstance);
    }

    render(){
        return (
            <MockDataService TODO_PROVIDER={this.todoProvider} NOTF_PROVIDER={this.notificationProvider}>
                <NotificationsComponent NOTF_PROVIDER={this.notificationProvider}/>
                <Provider TODO_PROVIDER={this.todoProvider} NOTF_PROVIDER={this.notificationProvider}>
                    <IndexPageContainer />
                </Provider>
            </MockDataService>
        )
    }

}