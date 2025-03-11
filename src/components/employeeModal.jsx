import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EmployeeModal = ({ open, onClose, onSave, initialData = {} }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    job_title: "",
    salary: "",
    joinedDate: "",
    ...initialData,
  });

  useEffect(() => {
    setEmployee({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(employee);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>{initialData?.id ? "Edit Employee" : "Add Employee"}</h2>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job Title"
          name="job_title"
          value={employee.job_title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          label="Joined Date"
          name="joinedDate"
          type="date"
          value={employee.joinedDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        /> */}
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EmployeeModal;
