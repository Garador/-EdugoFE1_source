import { Avatar, Button, Container, CssBaseline, Modal, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { TodoProvider } from '../../../../providers/Todo/Todo.provider';
import "./styles/style.scss";
import { LabelOutlined } from '@material-ui/icons';
import { ITodoEditForm } from '../../../../types/todo';

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
        if(this.provider.fullView){
            let id:any = this.provider.fullView.id;
            this.provider.setFullViewTodo(id, false);
        }
    }

    render() {
        return (
            <div>
                <Modal
                    open={!!this.provider.fullView}
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
                            overflowY:'scroll',
                            maxHeight:'calc(100vh - 8em)'
                        }}>
                            <Avatar style={{
                                margin: "1em",
                                backgroundColor: "black",
                            }}>
                                <LabelOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Displaying Record
                            </Typography>
                            <Typography variant="h3">
                                {this.provider.fullView?.title}
                            </Typography>
                            <Typography paragraph>
                                {this.provider.fullView?.description}
                            </Typography>
                            <Typography paragraph>
                                First sighting at: &nbsp;
                                {this.provider.fullView?.displayFS}
                            </Typography>
                            <Typography paragraph>
                                Is tagged?
                                {this.provider.fullView?.finished ? " YES" : " NO"}
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{
                                    margin: "0em 0em 1em",
                                }}
                                onClick={this.finishRowFullDisplayView}
                            >
                                Close
                            </Button>
                        </div>
                    </Container>
                </Modal>
            </div>)
    }
}