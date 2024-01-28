import React from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi} from 'react-icons/fa'
import { CiClock1 } from "react-icons/ci";
 
 const HotelService = () => {
   return (
     <>
     <Container className='mb-2'>
        <Header title={"Our Services"}/>

            <Row className='mt-4'>
                <h4 className='text-center'>
                    Services At <span className='hotel-color'>WanderWaltz </span>Hotel -
                    <span className='gap-2'>
                        <CiClock1 className='ml-5'/> 24-Hours Front Desk
                    </span>
                </h4>
            </Row>
            <hr/>

                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaWifi /> Wifi
                            </Card.Title>
                            <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col>
                    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaUtensils/> Breakfast
                            </Card.Title>
                            <Card.Text>Start your day with delicious breakfast buffet.</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col>
                    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaTshirt /> Laundary
                            </Card.Title>
                            <Card.Text>Keep your clothes clean and fresh with our laundary services.</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col>
                    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaCocktail /> Mini Bar
                            </Card.Title>
                            <Card.Text>Enjoy a refreshing drink and snack from our in-room mini-bar.</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col>
                    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaParking /> Parking
                            </Card.Title>
                            <Card.Text>Park your vehicle conveniently in our on-site parking lot.</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col>
                    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaSnowflake /> Air Conditioning
                            </Card.Title>
                            <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
        </Container>
     </>
   )
 }
 
 export default HotelService