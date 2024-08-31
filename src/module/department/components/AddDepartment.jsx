import React, { useState } from 'react';
import { Button, TextField, Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DepartmentService from '../service/DepartmentService';
import { formConfig } from './formConfig';

const AddDepartment = ({ open, onClose }) => {
    const [department, setDepartment] = useState({
        department_name: "",
        description: "",
        createdAt: "",
        updatedAt: ""
    });

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const DepartmentRegister = (e) => {
        e.preventDefault();
        DepartmentService.saveDepartment(department)
            .then((res) => {
                console.log(department);
                setMsg("Department Added Successfully");
                setDepartment({
                    department_name: "",
                    description: "",
                    createdAt: "",
                    updatedAt: ""
                });
            })
            .catch((error) => {
                console.log(error);
                setMsg("Error adding department");
            });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                marginLeft:"30%",
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2">
                        Add Department
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <form onSubmit={DepartmentRegister}>
                    {formConfig.map((field, index) => (
                        <TextField
                            key={index}
                            label={field.label}
                            name={field.name}
                            value={department[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            fullWidth
                            margin="normal"
                        />
                    ))}
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: "30px" }}>
                        Add Department
                    </Button>
                </form>
                {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
            </Box>
        </Modal>
    );
};

export default AddDepartment;
