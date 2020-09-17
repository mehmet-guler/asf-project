import React, { useState, useEffect } from 'react';
import './GuestBook.css';
import GuestBookForm from './GuestBookForm';
import GuestBookEntries from './GuestBookEntries';
import GuestBookFormWithGenericFormComponent from './GuestBookFormWithGenericFormComponent';

const default_entries = [
    {
        id: new Date().getTime() + Math.random(),
        name: "GuestBookUser",
        date: new Date().getTime(),
        subject: "Test Subject",
        message: "Lorem ipsum dolor sit amet",
        s: 4
    }, {
        id: new Date().getTime() + Math.random(),
        name: "GuestBookUser",
        date: new Date().getTime(),
        subject: "Test Subject",
        message: "Lorem ipsum dolor sit amet"
        , s: 1
    }, {
        id: new Date().getTime() + Math.random(),
        name: "GuestBookUser",
        date: new Date().getTime(),
        subject: "Test Subject",
        message: "Lorem ipsum dolor sit amet",
        s: 3
    }, {
        id: new Date().getTime() + Math.random(),
        name: "GuestBookUser",
        date: new Date().getTime(),
        subject: "Test Subject",
        message: "Lorem ipsum dolor sit amet",
        s: 2
    }
];

function GuestBook() {

    const initial_state = localStorage.getItem("guestbook") ? JSON.parse(localStorage.getItem("guestbook")) : default_entries;

    const [entries, addNewEntry] = useState(initial_state);

    // Component yüklendiğinde default entrileri localstorage'a yükledik çünküm silinmemesi için
    useEffect(() => {
        if (!localStorage.getItem("guestbook"))
            localStorage.setItem("guestbook", JSON.stringify(entries));
    }, [entries])


    const onAddNewEntry = (newEntry) => {
        const newEntries = [...entries, newEntry]
        addNewEntry(newEntries);
        localStorage.setItem("guestbook", JSON.stringify(newEntries))
    }

    return (
        <div className="guestbook">
            <h1 className="text-center">GUESTBOOK</h1>
            <div className="flex-container">

                {/* New Generic Method */}
                <GuestBookFormWithGenericFormComponent onAddNewEntry={onAddNewEntry} />

                {/* Old Method */}
                {/* <GuestBookForm onAddNewEntry={onAddNewEntry} /> */}
                <GuestBookEntries entries={entries} />

            </div>

        </div>
    )
}

export default GuestBook;