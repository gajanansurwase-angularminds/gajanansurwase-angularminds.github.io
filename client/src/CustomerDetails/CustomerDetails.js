import React, { PureComponent } from "react";

import axios from 'axios';
import { Button, Table, Modal, Card,ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect, Link, useHistory } from "react-router-dom"
import { useState, useEffect } from 'react';

const CustomerDetails = () => {
    const [CustDetails, setCustDetails] = useState([])


    useEffect(() => {
        const cust_details = localStorage.getItem("custDetails");

        if (cust_details) {
            let temp_cust = JSON.parse(cust_details);
            console.log("cust_details ", temp_cust)
            setCustDetails(temp_cust);

        }


    }, [])

    return (
        <div className="container" data-testid="custdetails-1" style={{paddingTop:"50px"}}>
            <div className="col-md-6 offset-md-3">
                <h4>Customer Information</h4><br/>
                <Card className="text-center">
                    <Card.Header>Selected Customer Details</Card.Header>
                    <Card.Body>
                        
                        <ListGroup variant="flush">
                            <ListGroup.Item>Customer Name: {CustDetails.firstName}&nbsp;{CustDetails.lastName}</ListGroup.Item>
                            <ListGroup.Item>Occupation: {CustDetails.occupation}</ListGroup.Item>
                            <ListGroup.Item>Status: {CustDetails.status}</ListGroup.Item>
                            <ListGroup.Item>Date Of Birth: {CustDetails.dob}</ListGroup.Item>
                            <ListGroup.Item>Bio Data: {CustDetails.bio}</ListGroup.Item>

                        </ListGroup>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </div>
        </div>
    );

}

export default CustomerDetails;