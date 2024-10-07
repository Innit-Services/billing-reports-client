// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import tokenService from '../../apis/tokenService';
import { useNavigate } from 'react-router-dom'; 
import { storeTokens } from '../../apis/tokenStorage';

const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await tokenService.signIn(email, password);
            const { token, refreshToken } = data;
            storeTokens(token, refreshToken);         
            console.log('Login successful, tokens saved in sessionStorage:', token, refreshToken);
            navigate('/');  
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container className="mt-5 shadow p-3 mb-5 bg-white rounded">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="text-center mb-4">
                        <h2>Login</h2>
                    </div>

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>

                        <div className="text-center mt-3">
                            <span>Don’t have an account? </span>
                            <a href="/signup">Signup</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
