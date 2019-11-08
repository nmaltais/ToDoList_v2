import React, {Component} from 'react';
import $ from "jquery";
import { Row, Col
    , Modal, ModalHeader, ModalBody
    , Form, FormGroup, Label, Input, Button} from 'reactstrap';


function RenderItem({item, deleteFn, completeFn}){
    var moment = require('moment');

    let dueDate = item.dueDate;
    let now = new Date();

    let dueSoon = dueDate.getTime() - now.getTime() > 0 && dueDate.getTime() - now.getTime() < 172800000;
    let pastDue = dueDate.getTime() - now.getTime() <= 0;
    dueDate = moment(dueDate.toISOString()).format("MM/DD/YYYY");

    return(
        <div className="item_desc">
            <input type='checkbox' className="todo_checkbox" onClick={() => completeFn(item.id)}/> {item.desc}
            {pastDue ? <a style={{color:'yellow'}} className="badge badge-danger"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></a> : ''}
            {dueSoon ? <a style={{color:'yellow'}} className="badge badge-warning-sign"><i className="fa fa-warning" aria-hidden="true"></i></a> : ''}
            <div className="item_date">due {dueDate}<i className="fa fa-trash" aria-hidden="true" onClick={() => deleteFn(item.id)}></i></div>
        </div>
    );
}

class ToDoContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }
    handleCreate(event) {

        event.preventDefault();
        let action = $("#CreateTaskForm").find("input[name=action]").val();
        let dueDate = $("#CreateTaskForm").find("input[name=dueDate]").val();
        let emailReminder = $("#CreateTaskForm").find("select[name=emailReminder] option:selected").val();
        this.props.addItem(action, dueDate, emailReminder);
        $('#CreateTaskForm').trigger("reset");
        this.toggleModal();

    }


    render(){

        const list = this.props.todos.filter(todo => todo.doneDate === null && !todo.isArchived).map((item) => {
            return (
                <li id="todo_2" key={item.id}>
                    <RenderItem item={item} deleteFn={this.props.deleteItem} completeFn={this.props.completeItem}/>
                </li>
            );
        });

        return (
            <>
            <Row className="d-flex justify-content-center" >
                <Col xs="12" sm="5" id="todoContainer" >
                    <div id="header"><h2>To-Do <i id="createTaskBtn" className="fa fa-plus-square" aria-hidden="true" onClick={this.toggleModal}></i></h2></div>
                    <div id="body">
                        <ul id="todoList">
                            {list}
                        </ul>
                    </div>
                </Col>
           </Row>


           <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size='lg'>
               <ModalHeader toggle={this.toggleModal}>Create Task</ModalHeader>
               <ModalBody>
                    <div style={{width:'80%', margin: '0px auto'}} >
                    <Form id="CreateTaskForm" onSubmit={this.handleCreate}>
                        <FormGroup row>
                            <Label size="lg" sm={4} htmlFor="action">Action</Label>
                            <Col sm={8}>
                                <Input  type="text" name="action" placeholder="Action" required/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label size="lg" sm={4} htmlFor="dueDate">Due Date</Label>
                            <Col sm={8}>
                                <Input  type="date" name="dueDate" required/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label size="lg" sm={4} htmlFor="emailReminder">Email Reminder</Label>
                            <Col sm={8}>
                            <Input type="select" name="emailReminder">
                                <option value="10mins">10 Minutes before</option>
                                <option value="30mins">30 Minutes before</option>
                                <option value="1hours">1 Hour before</option>
                                <option value="4hours">4 Hours before</option>
                                <option value="12hours">12 Hours before</option>
                                <option value="1days">1 Day before</option>
                                <option value="3days">3 Days before</option>
                                <option value="1weeks">1 Week before</option>
                                <option value="2weeks">2 Weeks before</option>
                            </Input>
                            </Col>
                        </FormGroup>
                        <Button type="submit" className="btn btn-primary btn-sm ml-1 float-right">Add</Button>
                    </Form>
                    </div>




               </ModalBody>
           </Modal>
           </>
       );
    }

}

export default ToDoContainer;
