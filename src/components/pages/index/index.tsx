import React from 'react';
import { IndexPageContainer } from './index.container';
import { TodoStoreInstance } from '../../../stores/TodoStore';
import { Provider } from 'mobx-react';
import { TodoProvider } from '../../../providers/TodoProvider';

export class IndexPage extends React.Component<{path:any}> {

    todoProvider:TodoProvider;
    
    constructor(props:any){
        super(props);
        this.todoProvider = new TodoProvider(TodoStoreInstance);
    }

    render(){
        return (
            <Provider TODO_PROVIDER={this.todoProvider}>
                <IndexPageContainer/>
            </Provider>
        )
    }

}