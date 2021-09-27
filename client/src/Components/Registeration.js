import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Card, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link, useHistory, withRouter } from "react-router-dom"

function RegistrationForm() {
    let history = useHistory();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const saveData = (e) => {

        // alert(userName + " " + userEmail + " " + userPassword);
        // var id = Math.random().toString(36).slice(2);
        // axios.post(`http://localhost:5000/registration/${id}`,{
        //     "user_name":userName,
        //     "user_email":userEmail,
        //     "user_password":userPassword
        // })
        // history.push("/Login");
        console.log("data ", user);
        const { userName, userEmail, userPassword } = user;
        if (userName && userEmail && userPassword) {
            axios.post("http://localhost:5000/register", user)
                .then(res => console.log(res))
            history.push("/Login");

        } else {
            // alert("Invalid data")
            setShow(true);

        }
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
        console.log(user);
    }

    return (
        <div className="container" style={{ width: "40%", paddingTop: "20px" }}>
            <Card>
                <Card.Body>
                    <Card.Title>User Registration</Card.Title>
                    <Form>
                        <Form.Group className="form-group" controlId="formBasicName">
                            <Form.Label style={{ float: "left" }}>Name</Form.Label>
                            <Form.Control size="sm" type="name" name="userName" placeholder="Enter Name" value={user.userName} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ float: "left" }}>Email address</Form.Label>
                            <Form.Control type="email" name="userEmail" placeholder="Enter email" value={user.userEmail} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ float: "left" }}>Password</Form.Label>
                            <Form.Control type="password" name="userPassword" placeholder="Password" value={user.userPassword} onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={saveData}>
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>All fields are mandatory</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default RegistrationForm;