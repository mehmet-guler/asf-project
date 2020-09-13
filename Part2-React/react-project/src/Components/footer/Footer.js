import React from 'react';
import './Footer.css'
function Footer() {
    return (
        <div className="d-flex align-items-center justify-content-between footer">
            <label>@2020 PRAGMANILA SOLUTIONS INCORPORATED</label>
            <div className="footer-menu">
                <ul className="list-group list-group-horizontal-sm">
                    <li className="list-group-item">Home</li>
                    <li className="list-group-item">Services</li>
                    <li className="list-group-item">Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;