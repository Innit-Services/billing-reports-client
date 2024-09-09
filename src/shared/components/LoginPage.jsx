// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useTokenService from '../../apis/tokenService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useTokenService(); // Use the custom hook

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signIn(email, password);
            navigate('/viewclient'); // Redirect after successful login
        } catch (error) {
            console.error('Login failed:', error);
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
