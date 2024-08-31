import React, { useState } from 'react';
import ClientService from '../service/ClientService';
import { Typography, TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Make sure this import is correct
import { formConfig } from './formConfig'; 

const AddClient = ({ open, onClose }) => {
  const [client, setClient] = useState({
    client_name: "",
    contact_person: "",
    contact_number: "",
    email: "",
    address: "",
    contract_start_date: "",
    contract_end_date: "",
    country: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ClientService.saveClient(client)
      .then((res) => {
        setMsg("Client Added Successfully");
        setClient({
          client_name: "",
          contact_person: "",
          contact_number: "",
          email: "",
          address: "",
          contract_start_date: "",
          contract_end_date: "",
          country: "",
        });
      })
      .catch((error) => {
        setMsg("Error in adding client");
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add Client
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'gray'
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {formConfig.map((field) => (
              <Grid item xs={12} sm={6} key={field.id}>
                <TextField
                  id={field.id}
                  name={field.id}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={client[field.id]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    pattern: field.pattern,
                    title: field.title,
                  }}
                  required
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Client
              </Button>
            </Grid>
          </Grid>
        </form>
        {msg && <Typography variant="h6" align="center" color="textSecondary" gutterBottom>{msg}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClient;