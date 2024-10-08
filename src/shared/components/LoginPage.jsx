import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axiosInstance from '../../apis/axiosInstance';
import '../../assets/styles/login.css';
import { useTheme } from '../../apis/ThemeContext.jsx'; 
import ColorPicker from './ColorPicker';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {themeColor } = useTheme();
    


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/signin', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token); 
            setError('');
            navigate('/viewdepartment'); 
        } catch (err) {
            setError('Login failed.');
        }
    };


    return (
        <div className='home'>
    <ColorPicker />
    <Container fluid className="main-home">
        <Row className="flex flex-col md:flex-row items-center justify-between shadow w-full md:w-[80vw] rounded-4">
            <Col md={6} className="left-side text-[2.5vw] font-semibold text-white p-[5vw]" style={{ backgroundColor: themeColor }}>
                <h1 className="welcome-animation mt-[20vh]">Welcome to Employee</h1>
                <h1 className="welcome-animation">
                    Billing Application <i className='bx bxs-paper-plane'></i><i className='bx bxs-paper-plane'></i>
                </h1>
            </Col>
            <Col md={6} className="signup rounded-4 bg-white p-5 md:w-[35vw] me-4">
                <h2 className="text-center my-2 font-bold text-lg">Login into account</h2>
                {error && <p className="text-red-500">{error}</p>}
                
                <Form onSubmit={handleLogin} className="mx-4 mt-5">
                    <Form.Group controlId="formEmail" className="mb-3 font-bold">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email..."
                            value={email}
                            className='rounded-pill p-2'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3 font-bold">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password..."
                            value={password}
                            className='rounded-pill p-2'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="w-full mt-3 rounded-pill" style={{ backgroundColor: themeColor }}>
                        Login
                    </Button>

                    <div className="text-center mt-3">
                        <span>Don’t have an account? </span>
                        <a href="/signup" className="text-blue-700">Sign Up</a><br />
                        <a href="" className="text-blue-700">forgot password?</a>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
</div>
    );
};

export default LoginPage;
