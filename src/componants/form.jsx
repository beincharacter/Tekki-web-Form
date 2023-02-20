import React, { useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form.scss";
import { FormContext } from '../context/details';

let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Form = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [skills, setSkills] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const { formData, setFormData, editableData, handledataEdit } = useContext(FormContext)


    useEffect(() => {
        if (editableData) {
            setFirstName(editableData.firstName);
            setLastName(editableData.lastName);
            setEmail(editableData.email);
            setPhoneNumber(editableData.phoneNumber);
            setDescription(editableData.description);
            setSkills(editableData.skills);
            setUsername(editableData.username);
            setFromDate(editableData.fromDate);
            setToDate(editableData.toDate);
        }
    }, [editableData])


    const addSkills = (skill) => {
        if (skills.includes(skill)) return
        setSkills([...skills, skill])
    }

    const handleFromDateChange = (date) => {
        setFromDate(date);
        if (date && toDate && date > toDate) {
            setToDate(null);
        }
    };

    const handleToDateChange = (date) => {
        if (fromDate && date < fromDate) {
            setToDate(fromDate);
        } else if (date && date > new Date()) {
            setToDate(new Date());
        } else {
            setToDate(date);
        }
    };

    function validateForm() {
        console.log("inside validator")
        const errors = {};
        if (username.length < 1) errors.username = 'Please enter valid username'
        if (phoneNumber.length !== 10) errors.phoneNumber = 'Please enter 10 digit phone number';
        if (phoneNumber.length === 10) {
            const existedData = formData.find((data) => {
                if (data.phoneNumber === phoneNumber) errors.phoneNumber = "Phone number already exists"
                return;
            })
        }
        if (!emailPattern.test(email)) errors.email = 'Please enter valid email';
        if (emailPattern.test(email)) {
            const existedData = formData.find((data) => {
                if (data.email === email) errors.email = "Email already exists"
            })
        }
        if (skills.length < 2) errors.skills = 'Please select at least two skill';
        if (!fromDate) errors.fromDate = 'Please enter a start date';
        if (!toDate) errors.toDate = 'Please enter an end date';
        if (description.length === 0) errors.description = 'Please enter something here';

        return errors;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        let err = validateForm();
        setFormErrors(err);
        
        if (Object.keys(err).length === 0) {
            console.log("submitting")
            const newFormData = {
                firstName,
                lastName,
                username,
                phoneNumber,
                skills,
                email,
                fromDate,
                toDate,
                description
            };

            if(Object.keys(newFormData).lebgth < 5) return alert("haha")

            setFormData([...formData, newFormData]);
            setFirstName('');
            setLastName('');
            setUsername('');
            setPhoneNumber('');
            setSkills([]);
            setEmail('');
            setFromDate(null);
            setToDate(null);
            setDescription('');
            setFormErrors({ });
        }
    }

    const handleNewRecord = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPhoneNumber('');
        setSkills([]);
        setEmail('');
        setFromDate(null);
        setToDate(null);
        setDescription('');

        editableData = null
    };


    function editValidateForm() {
        console.log("inside validator")
        const errors = {};
        if (username.length < 1) errors.username = 'Please enter valid username'
        if (phoneNumber.length !== 10) errors.phoneNumber = 'Please enter 10 digit phone number';
        // if (phoneNumber.length === 10) {
        //     const existedData = formData.find((data) => {
        //         if (data.phoneNumber === phoneNumber) errors.phoneNumber = "Phone number already exists"
        //         return;
        //     })
        // }
        // if (!emailPattern.test(email)) errors.email = 'Please enter valid email';
        // if (emailPattern.test(email)) {
        //     const existedData = formData.find((data) => {
        //         if (data.email === email) errors.email = "Email already exists"
        //     })
        // }
        if (skills.length < 2) errors.skills = 'Please select at least two skill';
        if (!fromDate) errors.fromDate = 'Please enter a start date';
        if (!toDate) errors.toDate = 'Please enter an end date';
        if (description.length === 0) errors.description = 'Please enter something here';

        return errors;
    };

    const handleEdit = (e) => {
        e.preventDefault();
        console.log("in handleEdit")
        let err = editValidateForm();
        console.log(err, " err");
        setFormErrors(err);
        if (Object.keys(err).length === 0) {
            console.log("submitting");
            const updatedFormData = {
                firstName,
                lastName,
                username,
                phoneNumber,
                skills,
                email,
                fromDate,
                toDate,
                description,
            };

            const editedDataIndex = formData.findIndex(
                (data) => data.email === editableData.email
            );

            const updatedFormDataArray = [...formData];
            updatedFormDataArray[editedDataIndex] = updatedFormData;

            setFormData(updatedFormDataArray);
            handledataEdit(null);

            setFirstName('');
            setLastName('');
            setUsername('');
            setPhoneNumber('');
            setSkills([]);
            setEmail('');
            setFromDate(null);
            setToDate(null);
            setDescription('');
            setFormErrors({});
        }
    };

    const handleCancel = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPhoneNumber('');
        setSkills([]);
        setEmail('');
        setFromDate(null);
        setToDate(null);
        setDescription('');
        setFormErrors({});
        handledataEdit(null)
        setFormErrors({})
    }

    return (
        <>
            <div className='form_container'>
                <form className='form' onSubmit={ (e) => editableData ? handleEdit(e) : handleSubmit(e)} >
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="firstName">First Name :</label></td>
                                <td><input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                /></td>
                                <td>{formErrors.firstName}</td>
                            </tr>
                            <tr>
                                <td><label htmlFor="lastName">Last Name :</label></td>
                                <td><input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                /></td>
                            </tr>

                            <tr>
                                <td><label htmlFor="username">Username :</label></td>
                                <td><input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value.toLowerCase())}
                                // required
                                /></td>
                                <p>{formErrors.username}</p>
                            </tr>
                            <tr>
                                <td><label htmlFor="phoneNumber">Phone Number :</label></td>
                                <td><input
                                    id="phoneNumber"
                                    type="tel"
                                    // pattern="[0-9]{10}"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                // required
                                /></td>
                                <p>{formErrors.phoneNumber}</p>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">Email :</label></td>
                                <td><input
                                    id="email"
                                    type="text"
                                    value={editableData ? editableData.email : email}
                                    onChange={(event) => setEmail(event.target.value)}
                                // required
                                /></td>
                                <p >{formErrors.email}</p>
                            </tr>
                            <tr>
                                <td><label htmlFor="skills">Skills :</label></td>
                                <td><select
                                    className="form-control"
                                    id="skills"
                                    value={skills[skills.length - 1]}
                                    onChange={(e) => addSkills(e.target.value)}
                                // required
                                >
                                    <option value="HTML">HTML</option>
                                    <option value="CSS">CSS</option>
                                    <option value="REACT">React</option>
                                    <option value="TYPESCRIPT">TypeScript</option>
                                    <option value="CSS3">CSS3</option>
                                    <option value="JAVASCRIPT">Javascript</option>
                                    <option value="JQUERY">jQuery</option>
                                </select>
                                </td>

                                {formErrors.skills ? <p>{formErrors.skills}</p> : <td>{skills.join(" ")}</td>}

                            </tr>
                            <tr>
                                <td><label htmlFor="experince">Experince :</label> <br /></td>
                                <td><label htmlFor="fromDate">{formErrors.fromDate ? <red> {formErrors.fromDate}</red> : "From"}</label>
                                    <DatePicker
                                        id="fromDate"
                                        selected={fromDate}
                                        onChange={handleFromDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="dd/mm/yyyy"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={10}
                                        maxDate={toDate || new Date()}
                                    /></td>


                                <td><label htmlFor="toDate">{formErrors.toDate ? <red> {formErrors.toDate}</red> : "To"}</label>
                                    <DatePicker
                                        id="toDate"
                                        selected={toDate}
                                        onChange={handleToDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="dd/mm/yyyy"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={10}
                                        minDate={fromDate}
                                        maxDate={new Date()}
                                    /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="desciption">Description :</label></td>
                                <td><input
                                    id="desciption"
                                    type="text"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                // required
                                /></td>
                                <p>{formErrors.description}</p>
                            </tr>
                        </tbody>
                    </table>
                    <div className='btn'>
                        <button type='submit' >{editableData ? "Save" : "Submit"}</button>
                        {/* <button onClick={(e) => editableData ? handleCancel(e) : handleNewRecord(e)}>{editableData ? "Cancel" : "New form"}</button> */}
                    </div>

                </form>
                <button className='cancel' onClick={(e) => editableData ? handleCancel(e) : handleNewRecord(e)}>{editableData ? "Cancel" : "New form"}</button>

            </div>
        </>
    )
}

export default Form