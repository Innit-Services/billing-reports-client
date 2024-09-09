// src/module/client/components/Searchbar.jsx
import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddEmployee from "../../module/employee/components/AddEmployee"; // Adjust the path as necessary

const Searchbar = () => {
    const [showModal, setShowModal] = useState(false);

    const handleAddEmployeeClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && <div className="modal-backdrop"></div>}
            <div className="searchbar-container mt-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 style={{ marginLeft: "170px" }}>Employees</h4>
                    <div className="d-flex align-items-center searchbar">
                        <i className='bx bx-search-alt-2 me-2' style={{ marginLeft: "50vw" }}></i>
                        <input
                            className="form-control search-input border"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                    <div className="action-buttons d-flex align-items-center">
                        <button className="btn filter-btn" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bx bx-filter-alt fs-5"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                            <li>
                                <label className="dropdown-item">
                                    <input type="checkbox" className="form-check-input" />
                                    Developer
                                </label>
                            </li>
                        </ul>
                        <button type="button" className="btn add-btn text-dark" onClick={handleAddEmployeeClick}>
                            <i className='bx bx-plus fs-5'></i>
                        </button>
                    </div>
                </div>
            </div>
            <AddEmployee showModal={showModal} closeModal={closeModal} />
            
            <style jsx>{`
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1040;
                }

                .searchbar-container {
                    position: relative;
                }

                .searchbar {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .search-input {
                    width: 200px;
                }

                .action-buttons {
                    margin-left: auto;
                }

                .btn.add-btn {
                    background: transparent;
                }
            `}</style>
        </>
    );
};

export default Searchbar;
