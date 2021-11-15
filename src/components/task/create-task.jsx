import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import {addTask} from "../../api/TaskApi";
import {useState} from "react";

const CreateTask = () => {
    const [description, setDescription] = useState();
    const [taskDate, setTaskDate] = useState(),

    onInput = (e) => {
        if(e.target.name === "description"){
            setDescription(e.target.value);
        }
        if(e.target.name === "taskDate"){
            setTaskDate(e.target.value);
        }
    },
    onFormSubmit = e => {
        Promise.resolve(addTask({description,taskDate})).then(
            window.location.reload()
        );
    }
    return (
        <Row>
            <Row><Col></Col><Col>Add Task</Col><Col></Col></Row>
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formTaskName">
                        <Form.Label >Description</Form.Label>
                        <Form.Control type="text" name="description" value={description} onChange={onInput} placeholder="Enter Task Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTaskDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" name="taskDate" value={taskDate} onChange={onInput} placeholder="Enter Task Date" />
                    </Form.Group>
                    <Button variant="light" type="button" onClick={onFormSubmit.bind(this)} style={{float: "right"}}>
                        Save
                    </Button>
                </Form>
            </Row>
        </Row>
    )
}

export default CreateTask;