import { Avatar, Button, Container, CssBaseline, Modal, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import { TodoProvider } from '../../../../providers/TodoProvider';
import "./styles/style.scss";
import { LabelOutlined } from '@material-ui/icons';
import { ITodoEditForm } from '../../../../types/todo';
import moment from 'moment';

@observer
export class FullViewTodoComponent extends React.Component<{ providerInstance: TodoProvider }> {

    state: { formData: ITodoEditForm } = {
        formData: {
            title: "",
            description: "",
            finished: false,
            first_sighting_at: ""
        }
    }
    provider: TodoProvider;

    constructor(props: any) {
        super(props);
        this.finishRowFullDisplayView = this.finishRowFullDisplayView.bind(this);
        this.provider = this.props.providerInstance;
    }

    finishRowFullDisplayView() {
        if(this.props.providerInstance.editingTodo){
            let id:any = this.props.providerInstance.editingTodo.id;
            this.props.providerInstance.setFullViewTodo(id, false);
        }
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.props.providerInstance.isEditingTodo}
                    onClose={()=>{this.finishRowFullDisplayView()}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="style-container"
                >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div style={{
                            marginTop: "8em",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Avatar style={{
                                margin: "1em",
                                backgroundColor: "black",
                            }}>
                                <LabelOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Displaying Your Todo
                            </Typography>
                            <Typography variant="h3">
                                {this.provider.fullViewTodo?.title}
                            </Typography>
                            <Typography paragraph>
                                {this.provider.fullViewTodo?.description}
                            </Typography>
                            <Typography paragraph>
                                First sighting at: 
                                {this.provider.fullViewTodo?.first_sighting_at}
                            </Typography>
                            <Typography paragraph>
                                Is tagged?
                                {this.provider.fullViewTodo?.finished}
                            </Typography>
                        </div>
                    </Container>
                </Modal>
            </div>)
    }
}