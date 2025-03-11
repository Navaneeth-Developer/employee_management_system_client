import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
  addEmployee,
} from "../redux/employeeSlice";
import EmployeeModal from "./employeeModal";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employees);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setModalOpen(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Employee Management System</h1>
        <Button variant="contained" onClick={handleAdd} style={{ height: 40 }}>
          Add Employee
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
              Name
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
              Email
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
              Job Title
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
              Salary
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : (
            list.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.job_title}</TableCell>
                <TableCell>{emp.salary}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(emp)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(emp.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {modalOpen && (
        <EmployeeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={(data) =>
            selectedEmployee
              ? dispatch(
                  updateEmployee({ id: selectedEmployee.id, employee: data })
                )
              : dispatch(addEmployee(data))
          }
          initialData={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
