import { Button, Container, Modal, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { TodoProvider } from '../../../../providers/TodoProvider';

@observer
export class AddTodoComponent extends React.Component<{ providerInstance: TodoProvider }> {

    constructor(props: any) {
        super(props);
        this.cancelRowAdd = this.cancelRowAdd.bind(this);
        this.startAddingNewRow = this.startAddingNewRow.bind(this);
    }

    cancelRowAdd() {
        this.props.providerInstance.setIsNotAddingNewRow();
    }

    startAddingNewRow(){
        this.props.providerInstance.setIsAddingNewRow()
    }

    render() {
        return (
            <div>
                <Container>
                    <Button color="primary" variant="contained" onClick={this.startAddingNewRow}>Add New Row</Button>
                </Container>
                <Modal
                    open={this.props.providerInstance.isAddingTodo}
                    onClose={this.cancelRowAdd}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Container>
                        <Typography variant="h1">Something</Typography>
                    </Container>
                </Modal>
            </div>)
    }
}