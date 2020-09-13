import React from 'react';
import './GuestBook.css';

function GuestBookEntries(props) {
    const { entries } = props;

    // sort by date
    // function sortByDate(){  
    //     return function(a,b){  
    //        if(a["date"] > b["date"])  
    //           return 1;  
    //        else if(a["date"] < b["date"])  
    //           return -1;  
       
    //        return 0;  
    //     }  
    //  }

    return (
        <div className="guestbook-entries">
            {entries.sort((a, b) => b.date - a.date).map(entry => {
                return (
                    <div className="entry" key={entry.id}>
                        <div>
                            <label className="username">{entry.name}</label>
                            <label>{new Date(entry.date).toLocaleDateString()} - {new Date(entry.date).toLocaleTimeString()}</label>

                        </div>
                        <p>{entry.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default GuestBookEntries;