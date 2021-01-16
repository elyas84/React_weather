import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 text-white">weather-API {year}</Col>
        </Row>
      </Container>
    </footer>
  );
}
