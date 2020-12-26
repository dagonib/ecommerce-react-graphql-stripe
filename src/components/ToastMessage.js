import React from 'react'
import { Alert } from 'react-bootstrap'

const ToastMessage = ({ show, message }) => (
    show && (<Alert variant='danger'>{message}</Alert>)
)

export default ToastMessage;