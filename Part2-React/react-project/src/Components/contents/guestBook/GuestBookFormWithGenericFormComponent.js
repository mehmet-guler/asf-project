import React from 'react';
import Form from '../../genericForm/Form';
import Input from '../../genericForm/Input';

function GuestBookFormWithGenericFormComponent({ onAddNewEntry }) {

    const handleSubmit = ({ name, subject, message }) => {
        const newEntry = { id: new Date().getTime() + Math.random(), name: name, subject: subject, message: message, date: new Date().getTime() }
        onAddNewEntry(newEntry);
    }

    return (
        <div className="guestbook-form text-center">
            <Form doIt={handleSubmit} showErrorLabel={true} showStatusAlert={true}>

                <div className="form-group">
                    <Input
                        type="input"
                        name="name"
                        validate={{
                            minLength: { value: 3, message: "This field must have a minimum of 3 characters" },
                            maxLength: { value: 30, message: "This field must have a maxium of 30 characters" },
                            required: true
                        }}
                        placeholder="Name..."
                    />
                </div>

                <div className="form-group">
                    <Input
                        type="input"
                        name="subject"
                        validate={{
                            customValidate: { value: (inputValue) => inputValue === "info", message: "This fields value must be a 'info' " },
                            required: true
                        }}
                        placeholder="Surname..."
                    />
                </div>

                <div className="form-group">
                    <Input
                        type="textarea"
                        name="message"
                        validate={{
                            minLength: { value: 15, message: "This field must have a minimum of 15 characters!" },
                            required: { value: true, message: "Message field must be a required!" }
                        }}
                        rows="3"
                        cols="50"
                        placeholder="Your message..."
                    />
                </div>

                <button type="submit" className="button green btn-block mb-2" >SEND</button>

            </Form>

        </div>
    )

}
export default GuestBookFormWithGenericFormComponent;