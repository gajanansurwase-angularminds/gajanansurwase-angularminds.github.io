import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Card, ListGroup, Form } from 'react-bootstrap';


function GoogleQues() {

    const [apiResp, setApiResp] = useState([])
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        // async function fetchBooks() {
        //     const response = await fetch('http://localhost:5000/submitedqueanswer')
        //     const json = await response.json();
        //     setApiResp(json);
        //     setFlag(true);
        //     console.log("resp of apiData " + JSON.stringify(apiResp));
        // }
        // fetchBooks();
        fetch('http://localhost:5000/submitedqueanswer')
        .then(resp=>resp.json())
        .then(resp=>{
            setApiResp(resp)
            setFlag(true)
        })
    }, []);

    return (
        <div className="container" style={{ width: "50%", paddingTop: "20px" }}>
            <Card>
                {flag === "true" || flag == true ? (
                    <Card.Body>
                        <Card.Title>Submitted Responses</Card.Title>
                        <Card>
                            <Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item style={{ fontWeight: "bold" }}>{apiResp.radioBtnQues}</ListGroup.Item>
                                    <ListGroup.Item>{apiResp.value}</ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                        </Card>
                        <br />
                        <Card >
                            <Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item style={{ fontWeight: "bold" }}>{apiResp.checkBoxQues}</ListGroup.Item>
                                    {/* <ListGroup.Item>Sachin Tendulkar</ListGroup.Item>
                                    <ListGroup.Item>Virat Kohali</ListGroup.Item> */}
                                </ListGroup>
                            </Card.Text>
                        </Card>
                    </Card.Body>
                ) : ""}
            </Card>

        </div>
    );

}

export default GoogleQues;