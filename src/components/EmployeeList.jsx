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
  Tooltip,
  TextField,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employees);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter employees based on search term
  const filteredList = list.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Search Employee"
          variant="outlined"
          size="small"
          value={searchTerm}
          sx={{ mr: 2 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd} style={{ height: 40 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Add Employee
            <Add style={{ marginLeft: "2px", marginBottom: "2px" }} />
          </span>
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
              Role
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
          ) : filteredList.length > 0 ? (
            filteredList.map((emp) => (
              <TableRow key={emp?.id}>
                <TableCell>{emp?.name}</TableCell>
                <TableCell>{emp?.email}</TableCell>
                <TableCell>{emp?.job_title}</TableCell>
                <TableCell>{emp?.salary}</TableCell>
                <TableCell>
                  <Tooltip arrow title="Edit">
                    <IconButton onClick={() => handleEdit(emp)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow title="Delete">
                    <IconButton onClick={() => handleDelete(emp.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No employees found</TableCell>
            </TableRow>
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
