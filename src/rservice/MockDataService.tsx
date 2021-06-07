import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { NotificationProvider } from '../providers/Notification/Notification.provider';
import { TodoProvider } from '../providers/Todo/Todo.provider';
import { ENotificationType } from '../types/notification';


export class MockDataService extends React.Component<{TODO_PROVIDER: TodoProvider, NOTF_PROVIDER: NotificationProvider}> {

    provider: TodoProvider;
    notificationProvider: NotificationProvider;
    state: {
        loadedMocks: boolean,
        error: boolean,
        loading: boolean
    } = {
        loadedMocks: false,
        error: false,
        loading: false
    };

    constructor(props:any){
        super(props);
        this.provider = this.props.TODO_PROVIDER;
        this.notificationProvider = this.props.NOTF_PROVIDER;
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        this.provider.loadMockTodos()
        .then(()=>{
            this.setState({loadedMocks: true, loading: false})
            this.notificationProvider.addNotification("Mock elements loaded", "Mock elements have been loaded correctly", ENotificationType.INFO);
        })
        .catch(()=>{
            this.setState({loadedMocks: false, loading: false, error: true});
            this.notificationProvider.addNotification("Error loading mock data", "There was an error loading the mock element.", ENotificationType.ERROR);
        })
    }

    get loadingScreen(){
        return (
            <Container>
                <Typography variant="h3">
                    Loading...
                </Typography>
            </Container>
        )
    }

    get errorScreen(){
        return (
            <Container>
                <Typography variant="h3">
                    An error ocurred.
                </Typography>
            </Container>
        )
    }



    render(){
        return !this.state.loading && this.state.loadedMocks ? <>
            {this.props.children}
        </> : <>
        {
            this.state.error ? this.errorScreen : <></>
        }
        {
            this.state.loading ? this.loadingScreen : <></>
        }
        </>
    }
}