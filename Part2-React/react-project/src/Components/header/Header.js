import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import './Header.css';

function Header() {
    return (
        <Navbar expand="lg" className="header">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="#home">HOME</Nav.Link>
                    <Nav.Link href="#link">SEGMENT</Nav.Link>
                    <Nav.Link href="#link">GUESTBOOK</Nav.Link>
                </Nav>

                <Nav className="ml-auto social-media">
                    <Nav.Link href="#home"><i className="fa fa-facebook" aria-hidden="true"></i></Nav.Link>
                    <Nav.Link href="#home"><i className="fa fa-twitter" aria-hidden="true"></i></Nav.Link>
                    <Nav.Link href="#home"><i className="fa fa-instagram" aria-hidden="true"></i></Nav.Link>
                    <Nav.Link href="#home"><i className="fa fa-linkedin" aria-hidden="true"></i></Nav.Link>
                    <Nav.Link href="#home"><i className="fa fa-google-plus" aria-hidden="true"></i></Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;