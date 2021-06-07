import { inject, observer } from 'mobx-react';
import React from 'react';
import {Button, Checkbox, Container, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography} from '@material-ui/core'
import { TodoProvider } from '../../../providers/TodoProvider';
import { AddTodoComponent } from './addTodo';
import { TodoObservable } from '../../../stores/TodoStore';
import {Pageview, DeleteOutlined, EditOutlined} from '@material-ui/icons'
import { EditTodoComponent } from './editTodo';
import { FullViewTodoComponent } from './fullViewTodo';

@inject("TODO_PROVIDER")
@observer
export class IndexPageContainer extends React.Component <any> {
    provider: TodoProvider;

    constructor(props:any){
        super(props);
        this.provider = this.props.TODO_PROVIDER;
    }

    render(){
        return (
            <Container>
                <Typography variant="h1">Hello World!</Typography>
                <div>
                    <AddTodoComponent providerInstance={this.provider}/>
                    {
                        this.provider.isEditingTodo ? 
                            <EditTodoComponent providerInstance={this.provider}/>
                        : <></>
                    }
                    {
                        this.provider.isTodoInFullView ? 
                            <FullViewTodoComponent providerInstance={this.provider}/>
                        : <></>
                    }
                </div>
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
                            this.provider.todos.map((todo: TodoObservable) => (
                                <TableRow key={todo.id}>
                                    <TableCell>
                                        {todo.displayFS}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={todo.finished}
                                            onChange={()=>this.provider.checkTodo(todo.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {todo.title}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteOutlined
                                        onClick={()=>{this.provider.deleteTodo(todo.id)}}/>
                                        <EditOutlined
                                        onClick={()=>{this.provider.setEditingTodo(todo.id, true)}}
                                        />
                                        <Pageview
                                        onClick={()=>{this.provider.setFullViewTodo(todo.id, true)}}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Container>
        )
    }

}