import React, { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form.scss";
import { FormContext } from '../context/details';



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

    const { formData, setFormData, editableData } = useContext(FormContext)

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



    const handleSubmit = (e) => {
        e.preventDefault();
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
    }

    const handleNewRecord = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPhoneNumber('');
        setEmail('');
        setFromDate(null);
        setToDate(null);
        setDescription('');
    };

    return (
        <>
            <div className='form_container'>
                <form className='form' onSubmit={handleSubmit} >
                    <table>
                        <tbody>
                        <tr>
                                <td><label htmlFor="firstName">First Name :</label></td>
                                <td><input
                                    id="firstName"
                                    type="text"
                                    value={firstName }
                                    onChange={(event) => setFirstName(event.target.value)}
                                /></td>
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
                                    onChange={(event) => setUsername(event.target.value.toLowerCase().replace(/\s/g, '').replace(/[^\w]/gi, ''))}
                                    required
                                /></td>
                                
                                
                        </tr>
                        <tr>
                            <td><label htmlFor="phoneNumber">Phone Number :</label></td>
                            <td><input
                                    id="phoneNumber"
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                    required
                                /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email :</label></td>
                            <td><input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="skills">Skills :</label></td>
                            <td><select
                                    className="form-control"
                                    id="skills"
                                    value={skills}
                                    onChange={(e) => addSkills(e.target.value)}
                                    required
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
                            <td>{skills.join(", ")}</td>
                        </tr>
                        <tr>
                            <td><label htmlFor="experince">Experince :</label> <br /></td>
                            <td><label htmlFor="fromDate">From:</label>
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
                            <div>
                                <label htmlFor="toDate">To:</label>
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
                                />
                            </div>
                        </tr>
                        <tr>
                            <td><label htmlFor="desciption">Description :</label></td>
                            <td><input
                                    id="desciption"
                                    type="text"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                /></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='btn'>
                    <button type='submit' >Submit</button>
                    <button onClick={handleNewRecord}>New Form</button>
                    </div>
                    
                </form>

            </div>
        </>
    )
}

export default Form