// src/module/client/components/UpdateClient.jsx
import React, { useEffect, useState } from "react";
import { Container, Grid, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ClientService from "../service/ClientService";
import axios from "axios";
import { formConfig } from "./formConfig"; 

const API_URL = "http://localhost:8080/api"; 

const UpdateClient = ({ showModal, closeModal, clientId }) => {
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
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (clientId) {
      ClientService.getClientById(clientId)
        .then((res) => {
          setClient(res.data);
        })
        .catch((error) => {
          console.log(error);
          setMsg("Failed to fetch client details.");
        });
    }
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/updateclient`, client);
      setModalMessage("Client updated successfully.");
    } catch (error) {
      setModalMessage("Failed to update client.");
    }
    closeModal(); // Close the modal after submission
  };

  return (
    <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>Update Client</DialogTitle>
      <DialogContent>
        <Container>
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
                  Update Client
                </Button>
              </Grid>
            </Grid>
          </form>
          {msg && <Typography variant="h6" color="textSecondary" gutterBottom>{msg}</Typography>}
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateClient;
