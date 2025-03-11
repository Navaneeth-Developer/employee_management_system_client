import React from "react";
import EmployeeList from "./components/EmployeeList";
import { Container, CssBaseline } from "@mui/material";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: "20px", marginTop: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Employee Management System</h1>
        <EmployeeList />
      </Container>
    </div>
  );
};

export default App;
