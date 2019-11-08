import React, { Component } from 'react';
import $ from "jquery";
import * as bootstrap from "bootstrap";

import {
  Collapse
  , Navbar, NavbarToggler, NavbarBrand, Nav, NavItem
  , Popover, PopoverBody, PopoverHeader, UncontrolledPopover
  , Modal, ModalHeader, ModalBody
  , Form, FormGroup, Label, Input, Button} from 'reactstrap';


class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            overDueItems : [],
            dueSoonItems : []
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    componentDidMount(){
        this.AssessDueDates();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.todos !== this.props.todos) {
        this.AssessDueDates();
      }
    }

    AssessDueDates = () => {

        this.setState({overDueItems : [], dueSoonItems : []});

        this.props.todos.filter(todo => todo.doneDate === null && !todo.isArchived).map((item) => {
            let dueDate = item.dueDate;
            let now = new Date();
            let dueSoon = dueDate.getTime() - now.getTime() > 0 && dueDate.getTime() - now.getTime() < 172800000;
            let pastDue = dueDate.getTime() - now.getTime() <= 0;
            if(pastDue){
                this.setState(prevState => ({
                  overDueItems: [...prevState.overDueItems, item]
                }));
            }
            if(dueSoon){
                this.setState(prevState => ({
                  dueSoonItems: [...prevState.dueSoonItems, item]
                }));
            }
        });
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }
    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }
    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
    }
    handleRegistration(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Registered! ");
        event.preventDefault();
    }



    render(){

        let OverDueNotifications = this.state.overDueItems.map((item) => {
            return (
                <p>{item.desc} is overdue!</p>
            );
        });
        let DueSoonNotifications = this.state.dueSoonItems.map((item) => {
            return (
                <p>{item.desc} is due soon!</p>
            );
        });
        let notificationsNumber = this.state.dueSoonItems.length+this.state.overDueItems.length

        return (
            <div>
                <Navbar className="navbar-dark" expand="sm">
                    <NavbarBrand href="/" id="navbarBrand">To-Do List with Reminder</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar style={{width:'100%'}}>
                            <NavItem>
                                {notificationsNumber > 0 ?
                                    <>
                                    <span id="notificationsBtn"  className="fa fa-bell fa-lg"><span className="badge badge-danger">{notificationsNumber}</span></span>
                                    <UncontrolledPopover trigger="legacy" placement="bottom" target="notificationsBtn">
                                        <PopoverHeader>Notifications</PopoverHeader>
                                        <PopoverBody>
                                            {OverDueNotifications}
                                            {DueSoonNotifications}
                                        </PopoverBody>
                                    </UncontrolledPopover>
                                    </>
                                : <span id="notificationsBtn" style={{color:'#ccc'}} className="fa fa-bell fa-lg"></span>}
                            </NavItem>

                            <NavItem className="navbar-text ml-auto">
                                <a id="loginBtn" onClick={this.toggleModal}><span className="fa fa-sign-in"></span> Login</a>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size='lg'>
                    <ModalHeader toggle={this.toggleModal}></ModalHeader>
                    <ModalBody>
                    <div class="d-flex justify-content-around">
                        <Form onSubmit={this.handleLogin}>
                            <h1>Login</h1><br></br>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" name="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password" placeholder="Password" />
                            </FormGroup>
                            <Button type="submit" className="btn btn-primary btn-sm ml-1 float-right">Login</Button>
                        </Form>
                        <div className="align-self-center">OR</div>
                        <Form onSubmit={this.handleRegistration}>
                            <h1>Register</h1><br></br>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" name="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                                <Input type="password" name="passwordConfirm" placeholder="Confirm Password" />
                            </FormGroup>
                            <Button type="submit" className="btn btn-primary btn-sm ml-1 float-right">Register</Button>
                        </Form>
                    </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export default NavBar;
