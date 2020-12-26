import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ToastMessage from './ToastMessage'
import Strapi from 'strapi-sdk-javascript/build/main'

const apiurl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiurl);

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeUsername= (event) => {
        setUsername(event.target.value)
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(isFormEmpty(username, email, password)) {
            showToast('Fill in all fields!')
            return
        }

        /**Submitted the Form */
        try {
            /**Set loading true */
            setLoading(true)
            
            /**make request to register user with Strapi */
            const response = await strapi.register(username, email, password)
            /**set loading false */
            setLoading(false)
            /**put token (to manage use session) in local storage */
            console.log(response)
            /**redirect user to home page */
        } catch (err) {
            /**set loading to false */
            setLoading(false)
            /** show error message with toast message */
            showToast(err)
        }
    }

    /**const redirectUser = path => props.history.pushState(path)*/

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
                        <Form.Group controlId="formBasicUsername">
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