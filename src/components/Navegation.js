import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Navegation = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Nav.Link href="/">Home</Nav.Link></Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/signin">Sign In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
    </Navbar>
)

export default Navegation;