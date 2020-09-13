import React, { useState } from 'react';
import './GuestBook.css';

function GuestBookForm({ onAddNewEntry }) {

    const validationMessages = {
        MINLENGTH: "This field must have a minimum of ",
        MAXLENGTH: "You have exceeded the maximum number of characters.",
        REQUIRED: "This field is required."
    }

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setError] = useState([]);

    const checkValidationAndSendData = (event) => {
        event.preventDefault();
        if (errors.length > 0) return;
        else {
            const newEntry = { id: new Date().getTime() + Math.random(), name: name, subject: subject, message: message, date: new Date().getTime() }
            onAddNewEntry(newEntry);

            setName("");
            setSubject("");
            setMessage("");
        }
    }

    const onSetName = (value) => {
        setName(value)
        if (value === "") setError([...errors, { name: "name", type: "REQUIRED", message: validationMessages["REQUIRED"] }])
        else if (value.length < 2) setError([...errors, { name: "name", type: "MINLENGTH", message: validationMessages["MINLENGTH"] + "2 characters" }])
        else {
            setError(errors.filter(error => error.name !== "name"))
        }
    }

    const onSetSubject = (value) => {
        setSubject(value)
        if (value.length > 30) setError([...errors, { name: "subject", type: "MAXLENGTH", message: validationMessages["MAXLENGTH"] + "Maximum number of characters 30" }])
        else if (value.length < 4) setError([...errors, { name: "subject", type: "MINLENGTH", message: validationMessages["MINLENGTH"] + "4 characters" }])
        else if (value === "") setError([...errors, { name: "subject", type: "REQUIRED", message: validationMessages["REQUIRED"] }])
        else {
            setError(errors.filter(error => error.name !== "subject"))
        }
    }

    const onSetMessage = (value) => {
        setMessage(value)
        if (value.length > 60) setError([...errors, { name: "message", type: "MAXLENGTH", message: validationMessages["MAXLENGTH"] + "Maximum number of characters 30" }])
        else if (value.length < 8) setError([...errors, { name: "message", type: "MINLENGTH", message: validationMessages["MINLENGTH"] + "8 characters" }])
        else if (value === "") setError([...errors, { name: "message", type: "REQUIRED", message: validationMessages["REQUIRED"] }])
        else {
            setError(errors.filter(error => error.name !== "message"))
        }
    }

    const getError = (name) => {
        const error = errors.filter(error => error.name === name);
        if (error.length > 0) return error;
        else return false
    }

    return (
        <div className="guestbook-form text-center">
            <form onSubmit={checkValidationAndSendData}>
                <div className="form-group">
                    <input onBlur={() => onSetName(name)} type="text" className="form-control" placeholder="Name" value={name} onChange={(event) => onSetName(event.target.value)} />
                    {errors.length > 0 && getError("name") && < small className="form-text text-danger" >{getError("name")[0].message}</small>}
                </div>
                <div className="form-group">
                    <input onBlur={() => onSetSubject(subject)} type="text" className="form-control" placeholder="Subject" value={subject} onChange={(event) => onSetSubject(event.target.value)} />
                    {errors.length > 0 && getError("subject") && < small className="form-text text-danger" >{getError("subject")[0].message}</small>}
                </div>
                <textarea onBlur={() => onSetMessage(message)} placeholder="Message" className="form-control" rows="4" cols="50" value={message} onChange={(event) => onSetMessage(event.target.value)}></textarea>
                {errors.length > 0 && getError("message") && < small className="form-text text-danger" >{getError("message")[0].message}</small>}
                <button className="button green" type="submit">SEND</button>
            </form>
        </div>

    )
}

export default GuestBookForm;