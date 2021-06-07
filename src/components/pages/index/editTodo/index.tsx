import { Avatar, Button, Container, CssBaseline, Modal, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import { TodoProvider } from '../../../../providers/Todo/Todo.provider';
import "./styles/style.scss";
import { LabelOutlined } from '@material-ui/icons';
import { ITodoEditForm } from '../../../../types/todo';
import moment from 'moment';
import { NotificationProvider } from '../../../../providers/Notification/Notification.provider';
import { ENotificationType } from '../../../../types/notification';
import "./index.scss";

@observer
export class EditTodoComponent extends React.Component<{ providerInstance: TodoProvider, notificationProvider: NotificationProvider }> {

    state: { formData: ITodoEditForm } = {
        formData: {
            title: "",
            description: "",
            finished: false,
            first_sighting_at: ""
        }
    }
    provider: TodoProvider;
    notfProvider: NotificationProvider;

    constructor(props: any) {
        super(props);
        this.finishRowEdit = this.finishRowEdit.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.provider = this.props.providerInstance;
        this.notfProvider = this.props.notificationProvider;
    }

    setData(){
        if(!this.provider.editingTodo){
            return;
        }
        let formData:ITodoEditForm = {
            title: this.provider.editingTodo.title,
            description: this.provider.editingTodo.description,
            finished: this.provider.editingTodo.finished,
            first_sighting_at: this.provider.getInputDate(this.provider.editingTodo.first_sighting_at)
        };
        this.setState({
            formData
        });
    }

    componentDidMount(){
        this.setData();
    }

    finishRowEdit() {
        if(this.props.providerInstance.editingTodo){
            let id:any = this.props.providerInstance.editingTodo.id;
            this.props.providerInstance.setEditingTodo(id, false);
        }
        
    }

    updateTodo(ev: SyntheticEvent) {
        ev.preventDefault();
        if(this.props.providerInstance.editingTodo){
            let id:any = this.props.providerInstance.editingTodo.id;
            this.props.providerInstance.updateTodo(id, this.state.formData);
            this.finishRowEdit();
            this.notfProvider.addNotification("Updated Record", "The record selected has been updated", ENotificationType.SUCCESS);
        }
    }

    updateFormData(ev:any){
        const {name, value} = ev.target;
        this.setState((state:any) => {
            state.formData[name] = value;
            return state;
        });
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.props.providerInstance.isEditingTodo}
                    onClose={()=>{this.finishRowEdit()}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="style-container"
                >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className="base-container">
                            <Avatar className="avatar">
                                <LabelOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Editing your todo
                            </Typography>
                            <form noValidate
                                onSubmit={this.updateTodo}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Todo Title"
                                    name="title"
                                    autoFocus
                                    onInput={this.updateFormData}
                                    value={this.state.formData.title}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="description"
                                    label="Todo Description"
                                    type="text"
                                    id="description"
                                    multiline
                                    rows={4}
                                    onInput={this.updateFormData}
                                    value={this.state.formData.description}
                                />
                                <Typography>
                                    First Sighting At
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="first_sighting_at"
                                    type="date"
                                    id="first_sighting_at"
                                    onInput={this.updateFormData}
                                    value={this.state.formData.first_sighting_at}
                                    InputProps={{inputProps: { min: this.provider.getInputDate(moment("1900").toDate()), max: this.provider.getInputDate(new Date())} }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="add"
                                    onClick={this.updateTodo}
                                >
                                    Update Record
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="cancel"
                                    onClick={()=>{this.finishRowEdit()}}
                                >
                                    Cancel
                                </Button>
                            </form>
                        </div>
                    </Container>
                </Modal>
            </div>)
    }
}