import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { NotificationProvider } from '../../../providers/Notification/Notification.provider';
import { ENotificationType } from '../../../types/notification';

/**
 * The alert element.
 * @param props The props for this alert
 */
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Handles the notification logic.
 */
@inject("NOTF_PROVIDER")
@observer
export class NotificationsComponent extends React.Component<any> {
    
    provider: NotificationProvider;
    constructor(props:any){
        super(props);
        this.provider = this.props.NOTF_PROVIDER;
        this.handleClose = this.handleClose.bind(this);
    }

    /**
     * Handles the closing for the notification.
     */
    handleClose(notificationId: string){
        this.provider.hideNotification(notificationId);
    }

    /**
     * Gets the severity for the notification.
     */
    getSeverity(notificationType: ENotificationType): any {
        const TYPES = {
            [ENotificationType.SUCCESS]: "success",
            [ENotificationType.WARNING]: "warning",
            [ENotificationType.ERROR]: "error",
            [ENotificationType.INFO]: "info"
        };
        return TYPES[notificationType] || "info";
    }


    render(){
        return (
            <div>
                {
                    this.provider.shownNotifications.map(element => (
                        <Snackbar
                            open={element.isShowing}
                            onClose={()=>this.handleClose(element.id)}
                            key={element.id}
                        >
                            <Alert onClose={()=>this.handleClose(element.id)} severity={this.getSeverity(element.type)}>
                                {element.description}
                            </Alert>
                        </Snackbar>
                    ))
                }
            </div>
        )
    }
    
}