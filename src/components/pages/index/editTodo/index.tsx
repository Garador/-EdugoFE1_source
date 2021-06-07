import { Avatar, Button, Container, CssBaseline, Modal, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import { TodoProvider } from '../../../../providers/TodoProvider';
import "./styles/style.scss";
import { LabelOutlined } from '@material-ui/icons';
import { ITodoEditForm } from '../../../../types/todo';
import moment from 'moment';

@observer
export class EditTodoComponent extends React.Component<{ providerInstance: TodoProvider }> {

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
        this.finishRowEdit = this.finishRowEdit.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.provider = this.props.providerInstance;
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
                                Editing your todo
                            </Typography>
                            <form style={{
                                width: '100%', // Fix IE 11 issue.
                                marginTop: "1em",
                            }} noValidate
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
                                    style={{
                                        margin: "1em 0em 2em",
                                    }}
                                    onClick={this.updateTodo}
                                >
                                    Edit Todo
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        margin: "0em 0em 1em",
                                    }}
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