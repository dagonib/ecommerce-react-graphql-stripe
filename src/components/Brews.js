import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Row, Container, Card, CardDeck, Button } from 'react-bootstrap'
import Strapi from 'strapi-sdk-javascript/build/main'

const apiurl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiurl);

const Brews = (props) => {

    const [brews, setBrews] = useState([])
    const [brand, setBrand] = useState('')

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

    return (
        <Container>
            {/**Brews Cards */}
            <Row className="d-flex justify-content-around">
                <CardDeck>
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
                                <Button variant="primary">Add to Cart</Button>
                           </Card.Body>
                       </Card> 
                    ))}
                </CardDeck>
            </Row>
        </Container>
    )
}

export default Brews;