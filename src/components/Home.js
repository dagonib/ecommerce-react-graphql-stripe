import React, { useState, useEffect } from 'react'
import {Row, Col, Container, Card, CardDeck } from 'react-bootstrap'
import Strapi from 'strapi-sdk-javascript/build/main'
import { BsSearch } from "react-icons/bs";
import Loader from './Loader'

const apiurl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiurl);

const Home = () => {

    const [brands, setBrands] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingBrands, setLoadingBrands] = useState(true)

    useEffect(() => {
        try {
            async function fetchData() {
                let response = await strapi.request('POST', '/graphql', {
                    data: {
                        query: `query {
                            brands {
                                _id
                                name
                                description
                                image {
                                    url
                                }
                            }
                        }`
                    }
                })
                setBrands(response.data.brands)
                setLoadingBrands(false)
            }
            fetchData();
        } catch (err) {
            console.log(err)
            setLoadingBrands(false)
        }       
    }, [])

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredBrands = () => {
        return brands.filter(brand => {
           return (
               brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               brand.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
    }

    return(
        <Container>
            {/**Brands Search */}
            <Row className="justify-content-center">
                <span className="input-group-text" id="basic-addon1"><BsSearch /></span>
                <input
                    placeholder="Search"
                    id="searchField"
                    onChange={handleChange}
                    value={searchTerm}
                />
            </Row>
            {/**Brands Header */}
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h1 style={title}>Brew Brands</h1>
                </Col>
            </Row>
            
            {/**Brands Cards */}
            <Row className="d-flex justify-content-around">
                <CardDeck>
                    {filteredBrands().map(brand => (
                        <Card
                            key={brand._id}
                            style={{ width: '15rem '}}
                        >
                            <Card.Img 
                                alt="Brand"
                                src={`${apiurl}${brand.image.url} `}
                                variant="top"
                            />
                            <Card.Body>
                                <Card.Title>{brand.name}</Card.Title>
                                <Card.Text>{brand.description}</Card.Text>
                                <Card.Link href={`/${brand._id}`}>See more</Card.Link>
                            </Card.Body>
                        </Card>
                    ))}
                </CardDeck>
            </Row>
            <Row className="d-flex justify-content-center mt-4">
                {/*<Loader 
                    visible={loadingBrands}
                    type="ThreeDots"
                    color="Blue"
                >*/}
                <Loader 
                    show={loadingBrands}
                />
            </Row>
        </Container>
    )
}

const title = {
    color: 'blue'
}

export default Home;




