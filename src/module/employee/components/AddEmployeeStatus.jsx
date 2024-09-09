import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import EmployeeService from '../EmployeeService';
import { formConfigStatus } from './formConfigStatus'; // Adjust the path as needed

const AddEmployeeStatus = ({ showModal, closeModal }) => {
    const [employeestatus, setEmployeeStatus] = useState({
        client_id: "",
        status: "",
        effective_date: "",
        end_date: "",
        updated_by: "",
        updated_on: "",
        home_non_home_client: "",
        person_id: "",
    });

    const [clients, setClients] = useState([]);

    useEffect(() => {
        EmployeeService.getAllClients()
            .then((response) => setClients(response.data))
            .catch((error) => console.error('Error fetching clients:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeStatus({ ...employeestatus, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeService.saveEmployeeStatus(employeestatus)
            .then(() => {
                setEmployeeStatus({
                    client_id: "",
                    status: "",
                    effective_date: "",
                    end_date: "",
                    updated_by: "",
                    updated_on: "",
                    home_non_home_client: "",
                    person_id: "",
                });
                closeModal();
            })
            .catch((error) => {
                console.error('Error adding employee status:', error);
                alert("Error in adding employee status");
            });
    };

    const renderFormField = (fieldConfig) => {
        switch (fieldConfig.type) {
            case 'select':
                return (
                    <FormControl fullWidth margin="dense" required={fieldConfig.required}>
                        <InputLabel>{fieldConfig.label}</InputLabel>
                        <Select
                            id={fieldConfig.id}
                            name={fieldConfig.id}
                            value={employeestatus[fieldConfig.id]}
                            onChange={handleChange}
                        >
                            {fieldConfig.options.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case 'date':
                return (
                    <TextField
                        type="date"
                        id={fieldConfig.id}
                        name={fieldConfig.id}
                        label={fieldConfig.label}
                        value={employeestatus[fieldConfig.id]}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"  // Reduced margin
                        InputLabelProps={{ shrink: true }}
                        required={fieldConfig.required}
                    />
                );
            case 'text':
            default:
                return (
                    <TextField
                        type="text"
                        id={fieldConfig.id}
                        name={fieldConfig.id}
                        label={fieldConfig.label}
                        placeholder={fieldConfig.placeholder}
                        value={employeestatus[fieldConfig.id]}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"  // Reduced margin
                        required={fieldConfig.required}
                        inputProps={{
                            pattern: fieldConfig.pattern,
                            title: fieldConfig.title,
                        }}
                    />
                );
        }
    };

    return (
        <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md" PaperProps={{ style: { width: '42vw', height: '574px', marginLeft:'52%'} }}>
            <DialogTitle>
                {/* Add Employee Status */}
                <Button
                    onClick={closeModal}
                    color="primary"
                    style={{ position: 'absolute', right: 8, top: 8}}
                >
                    Back
                </Button>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>  
                        {formConfigStatus.map((fieldConfig) => {
                            if (fieldConfig.id === 'client_id') {
                                fieldConfig.options = clients.map(client => ({
                                    value: client.client_id,
                                    label: client.client_id
                                }));
                            }
                            return (
                                <Grid item xs={12} sm={6} key={fieldConfig.id}>
                                    {renderFormField(fieldConfig)}
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary"  style={{ marginTop: '40px' }}> 
                        Add Employee
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddEmployeeStatus;
