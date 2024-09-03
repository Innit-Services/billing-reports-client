import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Dropdown } from 'react-bootstrap';
import { FaPhone, FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './profilepage.css';
const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [showForm, setShowForm] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const employee = {
        name: 'Ana Trujillo',
        id: '667566',
        email: 'ana.trujillo@psb.com',
    };

    return (
        <>
            <div className="container-fluid">
                <div className={`profile-content ${showForm ? 'blur' : ''}`}>
                    <Navbar variant="dark" expand="lg" className='header '>
                        <Container className='text-black'>
                            <h4>Profile</h4>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <div className="navbar me-auto text-black">
                                    <Dropdown className="dropdown">
                                        <Dropdown.Toggle
                                            id="dropdown-basic"
                                            className="ms-2 border-0 text-black d-block"
                                            style={{ background: "none", padding: "0" }}
                                        >
                                            Summary
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="dropdown-menu-end d-grid">
                                            <Dropdown.Item>Status</Dropdown.Item>
                                            <Dropdown.Item>Department</Dropdown.Item>
                                            <Dropdown.Item>Position</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Wedge</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Button
                                        variant="outline-black"
                                        className="nav-btn ms-1"
                                        onClick={() => navigate(`/profile/${parseInt(id) - 1}`)}
                                        disabled={!employee || parseInt(id) <= 1}
                                    >
                                        <FaArrowLeft />
                                    </Button>

                                    <Dropdown
                                        className="d-block mx-2 text-black"
                                        show={dropdownOpen}
                                        onClick={() => setDropdownOpen(prev => !prev)}
                                        ref={dropdownRef}
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-black"
                                            id="employee-dropdown"
                                            className='text-black outline-black'
                                        >
                                            {employee ? `${employee.id} ${employee.name}` : 'Select Employee'}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="dropdown-menu-vertical">
                                            {employee && (
                                                <Dropdown.Item>
                                                    {employee.id} {employee.name}
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Button
                                        variant="outline-black"
                                        className="nav-btn ms-1"
                                        onClick={() => navigate(`/profile/${parseInt(id) + 1}`)}
                                        disabled={!employee}
                                    >
                                        <FaArrowRight />
                                    </Button>
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <Container className="mt-3 shadow bg-white rounded">
                        <Card className="custom-card border-0">
                            <Card.Body
                                className="custom-scrollbar"
                                style={{
                                    maxHeight: '400px', // Adjust the height as needed
                                    overflowY: 'auto',  // Enable vertical scrolling
                                }}
                            >
                                <Row>
                                    <Col xs={12} md={3} className="text-center">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="Employee"
                                            className="img-fluid rounded-circle"
                                        />
                                        <h5 className="mt-3">Ana Trujillo</h5>
                                        <p>Female | 48 Yr(s), 04 months</p>
                                        <p>ana.trujillo@psb.com</p>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <p><strong>Date of Birth:</strong> 07/09/1971</p>
                                        <p><strong>Date of Joining:</strong> 12/11/1999</p>
                                        <p><strong>Current Address:</strong></p>
                                        <p>222, E Randolph Street San Francisco, United States</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p><FaPhone /> <strong>Office:</strong> 5088364204</p>
                                        <p><FaPhone /> <strong>Home:</strong> 5088364204</p>
                                        <p><FaPhone /> <strong>Mobile:</strong> 9787446123</p>
                                        <Button variant="outline-primary" className="mt-3" onClick={handleShowModal}>
                                            <FaEdit /> Edit basic information
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="m-2 border rounded p-3">
                                    <Col xs={12} md={4}>
                                        <p><strong>Employee No:</strong> 64</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p><strong>User Name:</strong> 64</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p ><strong>Position:</strong> Manager</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p ><strong>Department: </strong>Testing Engineer</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p >
                                            <strong>Status:</strong>San Francisco
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="m-2 border rounded p-3">
                                    <Col xs={12} md={4}>
                                        <p><strong>Employee No:</strong> 64</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p><strong>User Name:</strong> 64</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p ><strong>Position:</strong> Manager</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p ><strong>Department: </strong>Testing Engineer</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p >
                                            <strong>Status:</strong>San Francisco
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <a href="/viewemployee" className="nav-link text-primary text-center pb-2">Go Back..</a>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetails;
