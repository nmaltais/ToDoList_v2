import React from 'react';
import { Row, Col } from 'reactstrap';

function RenderItem({item, deleteFn}){
    var moment = require('moment');
    let doneDate = moment(item.doneDate.toISOString()).format("MM/DD/YYYY");
    return(
        <div className="item_desc">
            <input type='checkbox' className="done_checkbox" checked disabled/> {item.desc}
            <div className="item_date">done {doneDate}<i className="fa fa-trash" aria-hidden="true"  onClick={() => deleteFn(item.id)}></i></div>
        </div>
    );
}

const DoneContainer = (props) => {

    const list = props.todos.filter(todo => todo.doneDate !== null && !todo.isArchived).map((item) => {
        return (
            <li id="done_2" key={item.id}>
                <RenderItem item={item} deleteFn={props.deleteItem} />
            </li>
        );
    });

    return (
        <Row className="d-flex justify-content-center" >
            <Col xs="12" sm="5" id="completedContainer" >
                <div id="header"><h2>Done</h2></div>
                <div id="body">
                    <ul id="doneList">
                        {list}
                    </ul>
                </div>
            </Col>
       </Row>
   );
}

export default DoneContainer;
