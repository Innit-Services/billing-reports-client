import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'boxicons/css/boxicons.min.css';
// import '../../assets/styles/login.css';
import { useNavigate } from "react-router-dom";
// import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';

const LoginPage = () => {

    const navigate = useNavigate();

    function goToLayout() {
        navigate("/layout")
    }

    return (
        <>
            <h2>Login Page</h2>
            <button onClick={()=> navigate('/')}> Login</button>
        </>
    );
};

export default LoginPage;
