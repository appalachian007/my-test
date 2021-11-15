import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CreateTask from "./create-task"
import ViewTask from "./view-task";
import {getAllTask} from "../../api/TaskApi";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            showForm: false,
            disableNewButton: false,
            testData: [],
            checkedList:[]
        };
        this.displayForm = this.displayForm.bind(this);
    }
    async componentDidMount(){
        await getAllTask().then(data=>{
            this.setState({testData:data});
        });
    }
    // onCheck = (e) => {
    //     console.log("target value", e.target.name);
    //     if(e.target.name === "description"){
    //         setDescription(e.target.value);
    //         console.log("dscription:",description);
    //     }
    //     if(e.target.name === "taskDate"){
    //         setTaskDate(e.target.value);
    //     }
    // }
    displayForm(){
        this.setState({showForm:true});
        this.setState({disableNewButton:false});
    }

    render() {
        const borderStyle = {border: '1px solid lightgray', margin: "2px"};
        const hideStyle = {display: this.state.showForm? '':'none'}
        const {testData,disableNewButton} = this.state;
        return (
            <Container fluid>
                <Row><Col></Col><Col className="text-left">Tasker</Col><Col></Col></Row>
                <Row> <Col></Col>
                        <Col>
                            <Button variant="light"
                                              style={{"float": "right"}} onClick={this.displayForm} disabled={disableNewButton}>New</Button>
                        </Col>
                      <Col></Col>
                </Row>
                <Row style={hideStyle}><Col></Col><Col style={borderStyle}><CreateTask /></Col><Col></Col></Row>
                <Row>
                    <Col></Col><Col style={borderStyle}><ViewTask data={testData}/></Col><Col></Col>
                </Row>

            </Container>
        )
    }
}

export default Tasks