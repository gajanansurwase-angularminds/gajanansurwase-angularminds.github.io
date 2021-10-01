import React, { useState, useEffect } from 'react';

import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import axios from 'axios';
import { Modal,Form,FormGroup } from 'react-bootstrap';
import "./Google_form.css";
import { Accordion, AccordionSummary, AccordionDetails, Button, MenuItem, IconButton, Checkbox, FormControl, FormControlLabel, Typography } from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InboxIcon from '@material-ui/icons/Inbox'
import Radio from '@material-ui/icons/Radio';
import ShortTextIcon from '@material-ui/icons/ShortText';
import CloseIcon from '@material-ui/icons/Close';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FcRightUp } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import Centeredtabs from "./Tabs";



function GoogleForm() {
    const [questions, setQuestions] = useState(
        [
            {
                questionText: "",
                questionType: "radio",
                options: [
                    { optionText: "Option 1" }
                ],
                open: true,
                required: false
            }
        ]
    )

    const [documentName, setDocName] = useState("untitled Document");
    const [documentDescription, setDocDesc] = useState("Add Description");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function changeQuestion(text, i) {
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
    }

    function addQuestionType(i, type) {
        let qs = [...questions];
        qs[i].questionType = type;
        setQuestions(qs);
    }

    function changeOptionValue(text, i, j) {
        var optionsQuestion = [...questions];
        optionsQuestion[i].options[j].optionText = text;
        setQuestions(optionsQuestion);
    }

    function removeOption(i, j) {
        var removeOptionQuestion = [...questions];
        if (removeOptionQuestion[i].options.length > 1) {
            removeOptionQuestion[i].options.splice(j, 1);
            setQuestions(removeOptionQuestion);
        }
    }

    function addOption(i) {
        var optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({ optionText: "Option " + (optionsOfQuestion[i].options.length + 1) })
        } else {
            console.log("max 5 options");
        }
        setQuestions(optionsOfQuestion)
    }

    function deleteQuestion(i) {
        let qs = [...questions];
        if (questions.length > 1) {
            qs.splice(i, 1)
        }
        setQuestions(qs);
    }

    function requiredQuestion(i) {
        var reqQuestion = [...questions];
        reqQuestion[i].required = !reqQuestion[i].required;
        setQuestions(reqQuestion);
    }

    function addMoreQuestionField() {
        setQuestions([...questions,
        { questionText: "", questionType: "radio", options: [{ optionText: "option 1" }], open: true, required: false }])
    }

    function saveData() {
        // const req_data2 = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify( questions)
        // }
        var id = Math.random().toString(36).slice(2);
        axios.post(`http://localhost:5000/questions`, {
            "document_name": documentName,
            "doc_desc": documentDescription,
            "questions": questions
        })
        setShow(true);
    }


    // function PopUpOpen() {
    //     alert("in PopUpOpen");

    //     return (
    //         <Modal show={show} onHide={handleClose}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Modal heading</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={handleClose}>
    //                     Close
    //                 </Button>
    //                 <Button variant="primary" onClick={handleClose}>
    //                     Save Changes
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     )
    // }

    function questionUI() {
        return questions.map((ques, i) => (
            <Accordion expanded={questions[i].open} className={questions[i].open ? 'add_border' : ""}>
                <AccordionSummary
                    aria-controls="panelia-content"
                    id="panelia-header"
                    elevation={1} style={{ width: "100%" }}
                >
                    {/* {questions[i].open?(
                        <div className="saved_questions">
                            <Typography style={{fontSize:"15px",fontWeight:"400",letterSpacing:".1px",lineHeight:"24px",paddingBottom:"8px"}}>
                                {i+1}. {questions[i].questionText}
                            </Typography> */}
                    {/* {ques.options.map((op,j)=>(

                                <div key={j}>
                                    <div style={{display:'flex'}}>
                                        <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} disabled control={<input type={ques.questionType} color="primary" style={{marginRight:"3px"}} required={ques.type}/>}
                                        label={
                                            <Typography
                                            style={{fontFamily:"Roboto,Arial,sans-sarif",
                                                    fontSize:"13px",
                                                    fontWeight:"400",
                                                    letterSpacing:'.2px',
                                                    lineHeight:'20px',
                                                    color:'#202124',
                                                }}
                                            >
                                                {ques.options[j].optionText}
                                            </Typography>
                                        }/ >

                                    </div>

                                </div>
                            ))} */}

                    {/* </div>
                    ):""} */}
                </AccordionSummary>
                <div className="question_boxes">
                    <AccordionDetails className="add_question">
                        <div className="add_question_top">
                            <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e) => changeQuestion(e.target.value, i)}></input>
                            <CropOriginalIcon style={{ color: "#5f6368" }} />
                            <Select className="select" style={{ color: "#5f6368", fontSize: "13px" }}>
                                <MenuItem id="text" value="text" onClick={() => addQuestionType(i, "text")}><SubjectIcon style={{ marginRight: "10px" }} />Paragraph</MenuItem>
                                <MenuItem id="checkbox" value="checkbox" onClick={() => addQuestionType(i, "checkbox")}><CheckBoxIcon style={{ marginRight: "10px", color: "#70757a" }} />Check Box</MenuItem>
                                <MenuItem id="radio" value="radio" onClick={() => addQuestionType(i, "radio")} ><Radio style={{ marginRight: "10px", color: "#70757a" }} />Radio</MenuItem>
                                <MenuItem id="dropdown" value="dropdown" onClick={() => addQuestionType(i, "dropdown")} ><InboxIcon style={{ marginRight: "px", color: "#70757a" }} />Dropdown</MenuItem>

                            </Select>
                        </div>
                        {ques.options.map((op, j) => (
                            <div className="add_question_body" key={j}>
                                {
                                    (ques.questionType != "text") ?
                                        <input type={ques.questionType} style={{ marginRight: "10px" }} /> :
                                        <ShortTextIcon style={{ marginRight: "10px" }} />
                                }
                                <div>
                                    <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText} onChange={(e) => { changeOptionValue(e.target.value, i, j) }}></input>
                                </div>
                                <CropOriginalIcon style={{ color: "#5f6368" }} />
                                <IconButton aria-label="delete">
                                    <CloseIcon onClick={() => { removeOption(i, j) }} />
                                </IconButton>

                            </div>
                        ))}

                        {ques.options.length < 5 ? (
                            <div className="add_question_body">
                                <FormControlLabel disabled control={

                                    (ques.questionType != "text") ?
                                        <input type={ques.questionType} color="primary" inputProps={{ 'aria-label': "secondary checkbox" }}
                                            style={{ marginLeft: "10px", marginRight: "10px" }} disabled /> :
                                        <ShortTextIcon style={{ marginRight: "10px" }} />
                                } label={
                                    <div>
                                        <input type="text" className="text_input" style={{ fontSize: "13px", width: "60px" }} placeholder="Add other"></input>
                                        <Button size="small" style={{ textTransform: "none", color: "#4285f4", fontSize: "13px", fontWeight: "600" }} onClick={() => { addOption(i) }}>Add Option</Button>
                                    </div>
                                } />
                            </div>
                        ) : ""}

                        <div className="add_footer">
                            {/* <div className="add_question_bottom_left">
                                <Button size="small" style={{ textTransform: "none", color: "#4285f4", fontSize: "13px", fontWeight: "600" }}>
                                    <FcRightUp style={{ border: "2px solid #4285f4", padding: "2px", marginRight: "8px" }} />Answer Key</Button>

                            </div> */}
                            <div className="add_question_bottom">
                                {/* <IconButton aria-label="Copy">
                                    <FilterNoneIcon/>
                                </IconButton> */}
                                <IconButton aria-label="delete" onClick={() => { deleteQuestion(i) }}>
                                    <BsTrash />
                                </IconButton>
                                <span style={{ color: "#5f6368", fontSize: "13px" }}>Required</span><Switch name="checkedA" color="primary" checked={false} onClick={() => { requiredQuestion(i) }}></Switch>
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                        </div>
                    </AccordionDetails>
                    <div className="question_edit">
                        <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit" />
                        {/* <OndemandVideoIcon className="edit"/>
                        <CropOriginalIcon className="edit"/>
                        <TextFieldsIcon className="edit"/> */}
                    </div>
                </div>
            </Accordion>
        ))
    }

    return (
        <div className="question_form" data-testid="googleform-1">
            <br></br>
            <Centeredtabs />
            <div className="section">
                <div className="question_title_section">
                    <div className="question_form_top">
                        <input type="text" className="question_form_top_name" style={{ color: "black" }} placeholder="untitled document" onChange={(e) => { setDocName(e.target.value) }}></input>
                        <input type="text" className="question_form_top_desc" placeholder="form description" onChange={(e) => { setDocDesc(e.target.value) }}></input>

                    </div>
                    {questionUI()}
                    <div style={{ float: "right" }}>
                        <Button variant="contained" onClick={saveData}>send</Button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control type="email" name="userName" placeholder="Link" value={"http://localhost:3000/QuestionForm"}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Copy
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    );
}

export default GoogleForm;