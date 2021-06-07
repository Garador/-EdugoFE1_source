import { inject, observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import { Button, Checkbox, Container, MenuItem, Select, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@material-ui/core'
import { TodoProvider } from '../../../providers/Todo/Todo.provider';
import { AddTodoComponent } from './addTodo';
import { TodoObservable } from '../../../stores/TodoStore/Todo.store';
import { Pageview, DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { EditTodoComponent } from './editTodo';
import { FullViewTodoComponent } from './fullViewTodo';
import { NotificationProvider } from '../../../providers/Notification/Notification.provider';
import { ENotificationType } from '../../../types/notification';

@inject("TODO_PROVIDER", "NOTF_PROVIDER")
@observer
export class IndexPageContainer extends React.Component<any> {
    provider: TodoProvider;
    notfProvider: NotificationProvider;
    state = {
        elements: 5
    }

    constructor(props: any) {
        super(props);
        this.provider = this.props.TODO_PROVIDER;
        this.notfProvider = this.props.NOTF_PROVIDER;
        this.handleLimitResults = this.handleLimitResults.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    handleLimitResults(ev: any){
        this.setState({
            elements: ev.target.value
        })
    }

    deleteTodo(id:string){
        this.provider.deleteTodo(id);
        this.notfProvider.addNotification("Element removed successfully.", "Element removed successfully.", ENotificationType.SUCCESS);
    }

    render() {
        return (
            <Container>
                <Typography variant="h3" gutterBottom>List of animals to tag</Typography>
                <Container>
                    <AddTodoComponent providerInstance={this.provider}/>
                    {
                        this.provider.isEditingTodo ?
                            <EditTodoComponent providerInstance={this.provider} notificationProvider={this.notfProvider} />
                            : <></>
                    }
                    {
                        this.provider.isTodoInFullView ?
                            <FullViewTodoComponent providerInstance={this.provider} />
                            : <></>
                    }
                </Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                First Sighting
                            </TableCell>
                            <TableCell>
                                Tagged?
                            </TableCell>
                            <TableCell>
                                Animal Name
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.provider.todos.slice(0, this.state.elements)
                            .map((todo: TodoObservable) => (
                                <TableRow key={todo.id}>
                                    <TableCell>
                                        {todo.displayFS}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={todo.finished}
                                            onChange={() => this.provider.checkTodo(todo.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {todo.title}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteOutlined
                                            style={{margin:"0.5em",
                                            cursor:'pointer'
                                        }}
                                            onClick={() => { this.deleteTodo(todo.id) }} />
                                        <EditOutlined
                                            style={{margin:"0.5em",
                                            cursor:'pointer'
                                        }}
                                            onClick={() => { this.provider.setEditingTodo(todo.id, true) }}
                                        />
                                        <Pageview
                                            style={{margin:"0.5em",
                                            cursor:'pointer'
                                        }}
                                            onClick={() => { this.provider.setFullViewTodo(todo.id, true) }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Select
                                    labelId="results-ammount"
                                    id="select-results-ammount"
                                    value={this.state.elements}
                                    onChange={this.handleLimitResults}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={300}>200+</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Container>
        )
    }

}