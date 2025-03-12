import React from "react";
import EmployeeList from "./components/EmployeeList";
import { Container, CssBaseline } from "@mui/material";
import ThemeToggleButton from "./components/ThemeToggleButton";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: "0px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Employee Management System</h1>
          <ThemeToggleButton />
        </div>
        <EmployeeList />
      </Container>
    </div>
  );
};

export default App;
