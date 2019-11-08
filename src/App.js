import React, {Component} from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import ToDoContainer from './components/ToDoContainer';
import DoneContainer from './components/DoneContainer';




class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            todos : [
                {
                    "id" : "1",
                    "desc" : "Prepare lunches",
                    "dueDate" : new Date("09/28/2019"),
                    "doneDate" : null,
                    "emailReminder": null,
                    "isArchived" : false
                },
                {
                    "id" : "2",
                    "desc" : "Submit Course 2 Assignment 1",
                    "dueDate" : new Date("11/06/2019"),
                    "doneDate" : null,
                    "emailReminder": null,
                    "isArchived" : false
                },
                {
                    "id" : "3",
                    "desc" : "Read Chapters 15-20",
                    "dueDate" : new Date("12/30/2019"),
                    "doneDate" : null,
                    "emailReminder": null,
                    "isArchived" : false
                },
                {
                    "id" : "4",
                    "desc" : "Send birthday card to Bob",
                    "dueDate" : new Date("08/26/2019"),
                    "doneDate" : new Date("08/27/2019"),
                    "emailReminder": null,
                    "isArchived" : false
                },
                {
                    "id" : "5",
                    "desc" : "Finish my taxes",
                    "dueDate" : new Date("11/18/2019"),
                    "doneDate" : new Date("11/05/2019"),
                    "emailReminder": null,
                    "isArchived" : false
                },
                {
                    "id" : "6",
                    "desc" : "Read chapters 9-14",
                    "dueDate" : new Date("09/07/2019"),
                    "doneDate" : new Date("09/04/2019"),
                    "emailReminder": null,
                    "isArchived" : false
                },
                {
                    "id" : "7",
                    "desc" : "Take out the trash",
                    "dueDate" : new Date("09/04/2019"),
                    "doneDate" : new Date("09/04/2019"),
                    "emailReminder": null,
                    "isArchived" : false
                }
            ]
        }
    }

    addItem = (desc, dueDate, emailReminder) => {
        let id = this.state.todos.length+1;
        let newItem = {
            "id" : id,
            "desc" : desc,
            "dueDate" : new Date(dueDate+'T00:00:00'),
            "doneDate" : null,
            "emailReminder": emailReminder,
            "isArchived" : false
        }
        let newList = this.state.todos;
        newList.push(newItem);
        this.setState({todos : newList});

    }

    deleteItem = (itemID) => {
        let newList = this.state.todos.filter(todo => todo.id !== itemID);
        this.setState({todos : newList});
    }

    completeItem = (itemID) => {
        let doneDate = new Date();
        let newList = this.state.todos;
        newList.forEach((item) => {
            if(item.id == itemID)
                item.doneDate = doneDate;
        });
        this.setState({todos : newList});
    }

    render(){

        return (
            <>
            <NavBar todos={this.state.todos}/>
            <ToDoContainer todos={this.state.todos} deleteItem={this.deleteItem} completeItem={this.completeItem} addItem={this.addItem}/>
            <DoneContainer todos={this.state.todos} deleteItem={this.deleteItem}/>
            </>
        );
    }

}

export default App;
