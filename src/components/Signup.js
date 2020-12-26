import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ToastMessage from './ToastMessage'

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const handleChangeUsername= (event) => {
        setUsername(event.target.value)
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()

        if(isFormEmpty(username, email, password)) {
            showToast('Fill in all fields!')
        }

        console.log("submitted")
    }

    const isFormEmpty = (username, email, password) => {
        return !username || !email || !password
    }
    
    const showToast = toastMessage => {
        setToast(true)
        setToastMessage(toastMessage)
        setTimeout(() => {
            setToast(false)
            setToastMessage('')
        }, 5000);
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col md={6}>
                    <h1>Sign up</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control 
                                name="username"
                                type="text" 
                                placeholder="Enter username" 
                                onChange={handleChangeUsername}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                name="email" 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={handleChangeEmail}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control 
                                name="password"
                                type="password" 
                                placeholder="Password" 
                                onChange={handleChangePassword}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form> 
                    <ToastMessage show={toast} message={toastMessage} />
                </Col>             
            </Row>
        </Container>
    )

}

export default Signup;