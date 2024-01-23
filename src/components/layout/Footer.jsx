import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  let today = new Date();

  return (
    <footer className="bg-secondary text-light py-3 mt-lg-5">
      <Container>
        <Row>
          <Col xs={12} className='text-center'>
            <p className="mb-0">&copy; {today.getFullYear()} Wander Waltz. All rights reserved.</p>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} className='text-center'>
            <small>Designed And Developed By Veekesh Singh</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
