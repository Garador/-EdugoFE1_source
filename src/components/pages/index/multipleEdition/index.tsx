import { Button, Container } from '@material-ui/core';
import React from 'react';
import { NotificationProvider } from '../../../../providers/Notification/Notification.provider';
import { TodoProvider } from '../../../../providers/Todo/Todo.provider';
import { ENotificationType } from '../../../../types/notification';
import {ESelAction} from '../../../../types/todo'
import "./styles/index.scss";

interface IComponentProps {
    selected: {
        [index: string]: boolean
    },
    todoProvider: TodoProvider,
    notificationProvider: NotificationProvider,
    onActionPerformed: (action: ESelAction) => void
};

/**
 * Handles the multiple edition functionality.
 */
export class MultipleEdition extends React.Component<IComponentProps> {

    todoProvider: TodoProvider;
    notificationProvider: NotificationProvider;

    constructor(props: IComponentProps) {
        super(props);
        this.todoProvider = props.todoProvider;
        this.notificationProvider = props.notificationProvider;
        this.removeElements = this.removeElements.bind(this);
        this.checkElements = this.checkElements.bind(this);
    }


    /**
     * Gets wheter it has or not elements
     */
    hasElements() {
        return Object.keys(this.props.selected || {}).length > 0
    }

    /**
     * Removes the selected elements
     */
    removeElements() {
        try{
            let keys = Object.keys(this.props.selected);
            this.todoProvider.deleteSeveralTodos(keys);
            this.notificationProvider.addNotification("Removed Elements", "Elements have been removed", ENotificationType.SUCCESS);
            this.props.onActionPerformed(ESelAction.DELETED);
        }catch(e){
            this.notificationProvider.addNotification("Error", "Error removing elements", ENotificationType.SUCCESS);
        }
    }

    /**
     * Mark elements as its opposite.
     */
    checkElements(){
        try{
            let keys = Object.keys(this.props.selected);
            this.todoProvider.checkSeveralTodos(keys);
            this.notificationProvider.addNotification("Elements Updated", "The selected records have been updated.", ENotificationType.SUCCESS);
            this.props.onActionPerformed(ESelAction.CHECKED);
        }catch(e){
            this.notificationProvider.addNotification("Error", "Error removing Elements", ENotificationType.SUCCESS);
        }
    }

    /**
     * Checks wheter all the elements are finished.
     */
    areAllFinished(){
        let keys = Object.keys(this.props.selected);
        return this.todoProvider.todos.filter(element => {
            return (keys.indexOf(element.id) > -1 && element.finished)
        }).length === keys.length;
    }

    /**
     * Checks if all the elements are finished.
     */
    areAllInfunished(){
        let keys = Object.keys(this.props.selected);
        return this.todoProvider.todos.filter(element => {
            return (keys.indexOf(element.id) > -1 && !element.finished)
        }).length === keys.length;
    }

    render() {
        return (
            <div>
                {
                    this.hasElements() ? <Container className="multiple-selection-container">
                        <Button onClick={this.removeElements} color="secondary" variant="contained">
                            Remove
                        </Button>
                        {
                            this.areAllFinished() ?
                            <Button onClick={this.checkElements} color="secondary" variant="contained">
                                Untag All
                            </Button> : <> </>
                        }
                        {
                            this.areAllInfunished() ?
                            <Button onClick={this.checkElements} color="secondary" variant="contained">
                                Tag All
                            </Button> : <> </>
                        }
                    </Container> : <></>
                }
            </div>
        )
    }
}