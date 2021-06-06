import { inject, observer } from 'mobx-react';
import React from 'react';
import {Button, Checkbox, Container, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography} from '@material-ui/core'
import { TodoProvider } from '../../../providers/TodoProvider';
import { AddTodoComponent } from './addTodo';

@inject("TODO_PROVIDER")
@observer
export class IndexPageContainer extends React.Component <any> {
    provider: TodoProvider;

    constructor(props:any){
        super(props);
        this.provider = this.props.TODO_PROVIDER;
        window['todo_provider'] = this.props.TODO_PROVIDER;
    }

    render(){
        return (
            <Container>
                <Typography variant="h1">Hello World!</Typography>
                <div>
                    <AddTodoComponent providerInstance={this.props.TODO_PROVIDER}/>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Done?
                            </TableCell>
                            <TableCell>
                                Title
                            </TableCell>
                            <TableCell>
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.TODO_PROVIDER?.todos.map(todo => (
                                <TableRow>
                                    <TableCell>
                                        <Checkbox
                                            checked={todo.finished}
                                            onChange={()=>this.props.TODO_PROVIDER?.checkTodo(todo.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {todo.title}
                                    </TableCell>
                                    <TableCell>
                                        {todo.description}
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