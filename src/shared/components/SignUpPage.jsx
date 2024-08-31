import React from "react";
import { Form, Button, Container, Col,Row } from 'react-bootstrap';
import '../../assets/styles/login.css';

const SignUpPage = () => {
  return (
    <div className='home'>
                <Container fluid className="main-home">
                    <Row className="d-flex align-items-center justify-content-between ps-2 main-home shadow" style={{width:"1260px"}}>
                        <Col md={6} className="text-left" style={{width:"550px"}}>
                            <h1 className="welcome-animation  text-white">Welcome to Employee</h1>
                            <h1 className="welcome-animation  text-white">Billing Application <i className='bx bxs-paper-plane'></i><i className='bx bxs-paper-plane'></i></h1>
                            <Button className='bg-transparent border-white mt-3  ps-4 pe-4 text-align-center' href="loginpage">Login</Button>
                        </Col>
                        <Col md={6}  className="mt-5 shadow p-3 mb-5 pb-5 ps-3 signup"style={{width:"500px"}}>
                        <h2 className="text-center mb-4">Sign Up</h2>
        <Form>
        
          <Form.Group controlId="formFullName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>

      
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="user@gmail.com" required />
          </Form.Group>

         
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required />
          </Form.Group>

        
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <a href="/signin">Login</a>
          </div>
        </Form>
      </Col>
                    </Row>
                </Container>
            </div>
  );
};

export default SignUpPage;