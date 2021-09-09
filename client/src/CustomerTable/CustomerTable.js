import React, { PureComponent } from "react";

import axios from 'axios';
import { Button, Table, Modal, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route, Redirect, Link, useHistory } from "react-router-dom"
import CustomerForm from "../CustomerForm/CustomerForm";
import { useState, useEffect } from 'react';


const CustomerTable = () => {
    const [custData, setCustData] = useState([])
    const [singlecustData, setSingleCustData] = useState([])
    const [enteredId, setEnteredId] = useState('');
    const [isOpen, setOpenModal] = useState(false);
    const [isDeleted, setDeleted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:5000/customers')
            .then(response => {
                setCustData(response.data.customers)
            }
            )
            .catch((err) => {
                console.log("error " + JSON.stringify(err))
            })
    }, [isDeleted]);

    const handleShow = (id) => {
        setEnteredId(id);
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    }

    const deleteCustomer = () => {
        setDeleted(false)
        axios.delete(`http://localhost:5000/customer/${enteredId}`)
            .then(response => {
                if (response.data.success == true) {
                    setDeleted(true);
                    setOpenModal(false);
                }
            }
            )
            .catch((err) => {
                console.log("error " + JSON.stringify(err))
            })
    }

    const handleSingleCustDetails = (id) => {
        axios.get(`http://localhost:5000/customer/${id}`)
            .then(response => {
                // setSingleCustData(response.data.customer);
                // setIsLoaded(true);
                if (response.data.success == true) {
                    localStorage.setItem("custDetails", JSON.stringify(response.data.customer));
                    history.push("/customerdetails")

                }


            }
            )
            .catch((err) => {
                console.log("error " + JSON.stringify(err))
            })
    }

    function addNewCustomer() {
        history.push("/customerform")
        localStorage.clear();
    }

    const editCustomerDetails = (newid) => {
        history.push("/customerform")
        const new_cust_details = custData.filter(id => id._id == newid).map(val => val)
        localStorage.setItem("custId", JSON.stringify(new_cust_details))
    }

    return (
        <div className="container" data-testid="custtable-1">
            <div className="row">
                <div className="col"></div>
                <div className="col-md-8">
                    <h4 style={{ paddingTop: "20px" }}> Customer Table</h4>

                    {custData.length != 0 ? (
                        <Table striped bordered hover>

                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Occupation</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                    <th>Details</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>

                                {custData.map(id => (
                                    <tr>
                                        <td>{id.firstName}</td>
                                        <td>{id.lastName}</td>
                                        <td>{id.occupation}</td>
                                        <td>{id.status}</td>

                                        <td><Button type="button" className="btn btn-danger" aria-label="Close" onClick={() => handleShow(id._id)}
                                        >
                                            <i className="fa fa-trash-o fa-lg"></i>
                                        </Button></td>
                                        <td><Button type="button" className="secondary" onClick={() => handleSingleCustDetails(id._id)}>View</Button></td>
                                        <td><Button type="button" className="secondary" onClick={() => editCustomerDetails(id._id)}>Edit</Button></td>
                                        <Modal show={isOpen} onHide={closeModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are You Sure You Want TO delete Customer?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="btn btn-danger" onClick={deleteCustomer}>
                                                    Delete
                                         </Button>
                                                <Button variant="secondary" onClick={closeModal}>
                                                    Close
                                         </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </tr>

                                ))}
                            </tbody>
                        </Table>

                    ) : (<p>No data present Please Add Customer Details By Clicking Following Button</p>
                        )
                    }
                    <Button type="button" data-testid='close-1' className="secondary" onClick={addNewCustomer}>Add New Customer</Button><br /><br />
                </div>
                <div className="col"></div>

            </div>

        </div>
    );
}

export default CustomerTable;