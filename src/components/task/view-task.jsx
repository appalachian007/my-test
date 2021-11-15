import {ListGroup} from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {closeTasks, deleteTasks} from "../../api/TaskApi";

const ViewTask = props => {
    const [ids, updateIds] = useState([]);
    const extraStyle = {
        "borderTopWidth":"1px",
        "margin":"2px"
    };
    function clickIt (e) {
        console.log("target value", e.target.value);
        const id = e.target.value;
        updateIds([...ids, id]);
    }
    function deleteTasksAction(){
        Promise.resolve(deleteTasks(ids)).then(
            window.location.reload()
        );
    }
    function closeTasksAction(){
        Promise.resolve(closeTasks(ids)).then(
            window.location.reload()
        );
    }
    const {data} = props;
    return (
        <ListGroup>
            {data.map(d=>
                <ListGroup.Item style={extraStyle} key={d.id}>
                    <Row>
                        <Col>{d.description}</Col>
                        <Col >
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" name="status" value={d.id} style={{float: "right"}} onChange={clickIt}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        {d.taskDate[0]}-{d.taskDate[1]}-{d.taskDate[2]}
                    </Col>
                    </Row>

                </ListGroup.Item>
            )}
            <Row>
                <Col><Button variant="light"
                             style={{"float": "left"}} onClick={deleteTasksAction} >Delete Task</Button>
                </Col>
                <Col className="text-left"></Col>
                <Col>
                    <Button variant="light"
                            style={{"float": "right"}} onClick={closeTasksAction}>Close Task</Button>

                </Col>
            </Row>
        </ListGroup>
    )
}

export default ViewTask;