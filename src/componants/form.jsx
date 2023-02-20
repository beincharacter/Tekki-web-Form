import React, { useContext, useState } from 'react';
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

    console.log(fromDate, toDate)

    const { formData, setFormData, editableData, handledataEdit } = useContext(FormContext)

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

    const validateForm = (e) => {
        e.preventDefault()
        console.log("inside validator")
        const errors = {};
        if (username.length < 1) errors.username = 'Please enter valid username'
        if (phoneNumber.length !== 10) errors.phoneNumber = 'Please enter valid phone number';
        if (!emailPattern.test(email)) errors.email = 'Please enter valid email';
        if (skills.length < 2) errors.skills = 'Please select at least two skill';
        if (!fromDate) errors.fromDate = 'Please enter a start date';
        if (!toDate) errors.toDate = 'Please enter an end date';
        if (description.length === 0) errors.description = 'Please enter something here';
        setFormErrors(errors);
        console.log(formErrors)
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm(e);
        if(username.length === 0 || email.length === 0 || phoneNumber.length === 0 || fromDate.length ===0 || toDate.length === 0 || description.length ===0 ) return 
         else {
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

            const existedData = formData;
            // if (existedData.email.includes)
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
            setFormErrors({});
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

    const handleEdit = (e) => {
        e.preventDefault();
        console.log("inside edit")
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
        console.log(newFormData)
    }

    const handleCancel = () => {
        handledataEdit(null)
    }

    return (
        <>
            <div className='form_container'>
                <form className='form' onSubmit={
                    editableData !== null ? handleEdit : 
                    handleSubmit} >
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="firstName">First Name :</label></td>
                                <td><input
                                    id="firstName"
                                    type="text"
                                    value={editableData ? editableData.firstName : firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                /></td>
                                <td>{formErrors.firstName}</td>
                            </tr>
                            <tr>
                                <td><label htmlFor="lastName">Last Name :</label></td>
                                <td><input
                                    id="lastName"
                                    type="text"
                                    value={editableData ? editableData.lastName : lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                /></td>
                            </tr>

                            <tr>
                                <td><label htmlFor="username">Username :</label></td>
                                <td><input
                                    id="username"
                                    type="text"
                                    value={editableData ? editableData.username : username}
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
                                    value={editableData ? editableData.phoneNumber : phoneNumber}
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
                                    value={editableData ? editableData.skills : skills}
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
                                
                                {formErrors.skills ? <p>{formErrors.skills}</p> : <td>{skills.join(", ")}</td>}
                                
                            </tr>
                            <tr>
                                <td><label htmlFor="experince">Experince :</label> <br /></td>
                                <td><label htmlFor="fromDate">{formErrors.fromDate ? <red> {formErrors.fromDate}</red>: "From"}</label>
                                    <DatePicker
                                        id="fromDate"
                                        selected={editableData ? editableData.fromDate : fromDate}
                                        onChange={handleFromDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="dd/mm/yyyy"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={10}
                                        maxDate={toDate || new Date()}
                                    /></td>
                                    
                                    
                                    <td><label htmlFor="toDate">{formErrors.toDate ? <red> {formErrors.toDate}</red>: "To"}</label>
                                    <DatePicker
                                        id="toDate"
                                        selected={editableData ? editableData.toDate : toDate}
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
                                    value={editableData ? editableData.description : description}
                                    onChange={(event) => setDescription(event.target.value)}
                                // required
                                /></td>
                                <p>{formErrors.description}</p>
                            </tr>
                        </tbody>
                    </table>
                    <div className='btn'>
                        <button type='submit' >{editableData ? "Save" : "Submit"}</button>
                        <button onClick={editableData ? handleCancel : handleNewRecord}>{editableData ? "Cancel" : "New form"}</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Form