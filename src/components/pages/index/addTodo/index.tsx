import { Avatar, Button, Container, CssBaseline, Modal, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import { TodoProvider } from '../../../../providers/TodoProvider';
import "./styles/style.scss";
import { LabelOutlined } from '@material-ui/icons';
import { ITodoEditForm } from '../../../../types/todo';
import moment from 'moment';

@observer
export class AddTodoComponent extends React.Component<{ providerInstance: TodoProvider }> {

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
        this.provider = this.props.providerInstance;
        this.cancelRowAdd = this.cancelRowAdd.bind(this);
        this.startAddingNewRow = this.startAddingNewRow.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    cancelRowAdd() {
        this.provider.setIsAddingNewRow(false);
    }

    startAddingNewRow() {
        this.provider.setIsAddingNewRow(true)
    }

    addNewTodo(ev: SyntheticEvent) {
        ev.preventDefault();
        this.provider.makeTodo(this.state.formData);
        this.cancelRowAdd();
    }

    updateFormData(ev:any){
        let {name, value} = ev.target;
        this.setState((state:any) => {
            state.formData[name] = value;
            return state;
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Button color="primary" variant="contained" onClick={this.startAddingNewRow}>Add New Row</Button>
                </Container>
                <Modal
                    open={this.provider.isAddingTodo}
                    onClose={this.cancelRowAdd}
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
                                Add New Animal Record
                            </Typography>
                            <form style={{
                                width: '100%', // Fix IE 11 issue.
                                marginTop: "1em",
                            }} noValidate
                                onSubmit={this.addNewTodo}>
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
                                >
                                    Add New Todo
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        margin: "0em 0em 1em",
                                    }}
                                    onClick={this.cancelRowAdd}
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