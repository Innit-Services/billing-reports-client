import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, IconButton, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import EmployeeService from '../EmployeeService';
import AddEmployeeStatus from './AddEmployeeStatus';
import { formConfig } from './formConfig';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AddEmployee = ({ showModal, closeModal }) => {
    const [employee, setEmployee] = useState({});
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [showAddStatusModal, setShowAddStatusModal] = useState(false);

    useEffect(() => {
        EmployeeService.getAllDepartments()
            .then((response) => setDepartments(response.data))
            .catch((error) => console.error('Error fetching departments:', error));
    }, []);

    useEffect(() => {
        EmployeeService.getAllDesignations()
            .then((response) => setDesignations(response.data))
            .catch((error) => console.error('Error fetching designations:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeService.saveEmployee(employee)
            .then(() => {
                setEmployee({});
                setShowAddStatusModal(true); 
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
            });
    };

    return (
        <>
            <Dialog open={showModal} onClose={closeModal} maxWidth="sm" fullWidth style={{marginLeft:"52%"}}>
                <DialogTitle>
                    Add Employee
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={closeModal}
                        aria-label="close"
                        style={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <span>&times;</span>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            {Object.entries(formConfig).map(([key, config]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    {config.type === 'select' ? (
                                        <TextField
                                            select
                                            fullWidth
                                            label={config.label}
                                            name={key}
                                            value={employee[key] || ''}
                                            onChange={handleChange}
                                            required={config.validation?.required}
                                            helperText={config.validation?.title}
                                            margin="dense"
                                        >
                                            {config.options.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : (
                                        <TextField
                                            type={config.type}
                                            fullWidth
                                            label={config.label}
                                            name={key}
                                            placeholder={config.placeholder}
                                            value={employee[key] || ''}
                                            onChange={handleChange}
                                            required={config.validation?.required}
                                            pattern={config.validation?.pattern}
                                            title={config.validation?.title}
                                            margin="dense"
                                        />
                                    )}
                                </Grid>
                            ))}
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                    Save
                                </Button> 
                                <IconButton onClick={() => setShowAddStatusModal(true)}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            {showAddStatusModal && (
                <AddEmployeeStatus
                    showModal={showAddStatusModal}
                    closeModal={() => setShowAddStatusModal(false)}
                />
            )}
        </>
    );
};

export default AddEmployee;
