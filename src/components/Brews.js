import React, { useEffect, useState } from 'react'
import {Row, Col, Container, Card, CardGroup, Button } from 'react-bootstrap'
import { BsFillTrashFill } from "react-icons/bs";
import Strapi from 'strapi-sdk-javascript/build/main'
import { calculatePrice } from '../utils/index'

const apiurl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiurl);

const Brews = (props) => {

    const [brews, setBrews] = useState([])
    const [brand, setBrand] = useState('')
    const [cartItems, setCartItems] = useState([])

    useEffect (() => {
        //console.log(props.match.params.brandId)
        try {
            async function fetchData() {
                let response = await strapi.request('POST', '/graphql', {
                    data: {
                        query: `query {
                            brand(id: "${props.match.params.brandId}") {
                                _id
                                name
                                brews {
                                    _id
                                    name
                                    description
                                    image {
                                        url
                                    }
                                    price
                                }
                            }
                        }`
                    }
                })
                setBrews(response.data.brand.brews)
                setBrand(response.data.brand.name)
            }
            fetchData();
        } catch(err) {
            console.log(err)
        }
    }, [])

    const addToCart = (brew) => {
        const alreadyInCart = cartItems.findIndex(
            item => item._id === brew._id
        )

        if(alreadyInCart === -1) {
            const updatedItems = cartItems.concat({
                ...brew,
                quantity: 1
            })
            setCartItems(updatedItems)
        } else {
            const updatedItems = [...cartItems]
            updatedItems[alreadyInCart].quantity += 1
            setCartItems(updatedItems)
        }
    }

    const deleteItemFromCart = (itemToDeleteId) => {
        const filteredItems = cartItems.filter(
            item => item._id !== itemToDeleteId
        )
        setCartItems(filteredItems)
    }

    return (
        <Container>
            {/**Brews Cards */}
            <Row className="d-flex justify-content-around">
                <Col xs={{ order: 2, span: 12 }} md={{ order: 1, span: 8}}>
                    <CardGroup>
                        {brews.map(brew => (
                        <Card
                                key={brew._id}
                                style={{ width: '15rem '}}
                        >
                            <Card.Img 
                                    alt="Brew"
                                    src={`${apiurl}${brew.image[0].url}`}
                                    variant="top"
                            />
                            <Card.Body>
                                    <Card.Title>{brew.name}</Card.Title>
                                    <Card.Text>{brew.description}</Card.Text>
                                    <Card.Text>{brew.price}</Card.Text>
                                    <Button 
                                        variant="primary"
                                        onClick={() => addToCart(brew)}
                                    >Add to Cart
                                    </Button>
                            </Card.Body>
                        </Card> 
                        ))}
                    </CardGroup>
                </Col>

                {/**User Cart */}
                <Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 4}}>
                    <Card>
                        <Card.Header>Your Cart</Card.Header>
                        <Card.Body>
                            <Card.Text>{cartItems.length} items selected</Card.Text>
                            <Card>
                                {cartItems.map(item => (
                                    
                                    <Card.Text>
                                        {item.name} x {item.quantity} - ${(item.quantity * item.price).toFixed(2)}
                                        <BsFillTrashFill 
                                            onClick={() => deleteItemFromCart(item._id)}
                                        />
                                    </Card.Text>
                                ))}
                            </Card>
                            {cartItems.length === 0 && (
                                <Card.Text>Please select some items</Card.Text>
                            )}
                            <Card.Text>Total: ${calculatePrice(cartItems)}</Card.Text>
                            <Card.Link href="/checkout">Checkout</Card.Link>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>

            
            
        </Container>
    )
}

export default Brews;