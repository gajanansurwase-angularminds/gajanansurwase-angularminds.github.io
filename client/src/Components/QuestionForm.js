import React, { useState, useEffect } from 'react';
import { Modal, Form, Card, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import "./Question_form.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

function QuestionForm() {

    const [apiData, setApidata] = useState([]);

    const [value, setValue] = React.useState('');
    const [radioBtnQues, setRadioBtnQues] = useState();
    const [checkBoxQues, setCheckBoxQues] = useState();
    const [flag, setFlag] = useState(false);
    const [checkedValue, setCheckedValue] = useState({});


    useEffect(() => {
        async function fetchApis() {
            const response = await fetch('http://localhost:5000/askedQues')
            const json = await response.json();
            setApidata(json);

            setFlag(true);
            // .then(response => response.json())
            // .then(response => {
            //     alert("resp " + JSON.stringify(response));
            //     setApidata(response)
            //     alert("resp " + JSON.stringify(apiData));
            // })
            // .catch((err) => {
            //     console.log("error " + JSON.stringify(err))
            // })
        }
        fetchApis();
    }, []);

    // function selectedRadioValue(value) {
    //     alert(JSON.stringify(value));
    // }

    const handleChange = (newVal, ques) => {
        setValue(newVal);
        setRadioBtnQues(ques);
        // alert(newVal+" "+ques)

    };
    const handleChangeForCheckBox = (newVal, ques) => {
        setCheckedValue(newVal)
        setCheckBoxQues(ques)
    }

    function submitDataToApi() {
        axios.post(`http://localhost:5000/submitquestion`, {
            "value": value,
            "radioBtnQues": radioBtnQues,
            "checkBoxQues": checkBoxQues,
            "checkedValue": checkedValue
        })
        alert("Response Sumbitted Successfully");
    }


    return (
        <div className="container" style={{ width: "40%" }}>
            <Card>
                <Card.Header>{apiData.document_name}</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text>
                        {flag === "true" || flag == true ? (
                            <div>
                                {apiData.questions.map((ques, i) => (
                                    <div>
                                        <div className="firstdiv">
                                            <div className="seconddiv">
                                                <div className="thirddiv">
                                                    <div className="fourthdiv">{ques.questionText}</div>
                                                </div>
                                            </div>
                                            {ques.questionType === "checkbox" ? (
                                                <div>
                                                    {ques.options.map((options, i) => (
                                                        // <InputGroup>
                                                        //     <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                                        //     {options.optionText}
                                                        // </InputGroup>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox name={options.optionText} checked={checkedValue[options.optionText]} onChange={e => handleChangeForCheckBox({ ...checkedValue, [e.target.name]: e.target.checked }, ques.questionText)} />
                                                                }
                                                                label={options.optionText}
                                                            />
                                                        </FormGroup>
                                                    ))}
                                                </div>
                                            ) : ""}
                                            {ques.questionType === "radio" ? (
                                                <div>
                                                    {ques.options.map((options, i) => (
                                                        // <InputGroup onClick={()=>{selectedRadioValue(ques.questionText)}}>
                                                        //     <InputGroup.Radio aria-label="Radio for following text input" />
                                                        //     {options.optionText}
                                                        // </InputGroup>
                                                        <FormGroup>
                                                            <FormControl component="fieldset">
                                                                <RadioGroup
                                                                    name="radio-buttons-group"
                                                                    value={value}
                                                                    onChange={e => handleChange(e.target.value, ques.questionText)}
                                                                >
                                                                    <FormControlLabel value={options.optionText} control={<Radio />} label={options.optionText} />

                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormGroup>
                                                    ))}
                                                </div>
                                            ) : ""}
                                            {ques.questionType === "text" ? (
                                                <div>
                                                    {ques.options.map((options, i) => (
                                                        // <InputGroup>
                                                        //     <InputGroup.Text aria-label="Radio for following text input" />
                                                        //     {options.optionText}
                                                        // </InputGroup>
                                                        <FormGroup>
                                                            {options.optionText}
                                                        </FormGroup>
                                                    ))}
                                                </div>
                                            ) : ""}

                                        </div>

                                        <div>

                                        </div>
                                    </div>

                                ))}
                            </div>
                        ) : ""}
                    </Card.Text>
                    <Button variant="primary" onClick={submitDataToApi}>Submit</Button>
                </Card.Body>
            </Card>
        </div >
    );

}

export default QuestionForm;