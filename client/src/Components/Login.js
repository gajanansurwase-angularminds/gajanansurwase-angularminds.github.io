import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Card, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link, useHistory, withRouter } from "react-router-dom"

function Login() {
    let history = useHistory();

    const [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    })
    const [apiResp, setApiResp] = useState('');
    const [show, setShow] = useState(false);
    const [showErr, setShowErr] = useState(false);

    const handleClose = () => setShow(false);
    const closeErrMsg = () => setShowErr(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
        console.log(user);
    }

    const userLogin = (e) => {
        console.log("in userLogin " + user.length)
        const { userEmail, userPassword } = user;
        if (userEmail && userPassword) {
            axios.post("http://localhost:5000/login", user)
                .then((res) => {
                    console.log('res ', res.data.message);
                    setApiResp(res.data.message)
                    if (res.data.message === "password did not match" || res.data.message === "user not found") {
                        // alert("Please enter correct user name or password")
                        setShow(true);
                    }
                    else if (res.data.message === "Login Successful") {
                        console.log("in esle if")
                        history.push("/GoogleFrom")
                    }
                })
                .catch((err) => {
                    console.log("errorrrr " + JSON.stringify(err))
                })

        }
        else {
            setShowErr(true)
        }
        e.preventDefault();

    }

    return (
        <div className="container" style={{ width: "40%", paddingTop: "20px" }} data-testid="login-1">

            <Card>
                <Card.Body>
                    <Card.Title>User Login</Card.Title>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label style={{ float: "left" }}>Email Address</Form.Label>
                            <Form.Control type="email" name="userEmail" placeholder="Enter Email" value={user.userEmail} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ float: "left" }}>Password</Form.Label>
                            <Form.Control type="password" name="userPassword" placeholder="Enter Password" value={user.userPassword} onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={userLogin} data-testid="loginbtn-1">
                            LogIn
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Please enter correct email or password</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErr} onHide={closeErrMsg}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Please enter email or password</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeErrMsg} data-testid="loginbtn-1">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default Login;