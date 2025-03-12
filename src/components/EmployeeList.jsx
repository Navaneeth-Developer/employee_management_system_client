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
  TablePagination,
  TableContainer,
  useTheme,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === "dark";
  const { list, loading } = useSelector((state) => state.employees);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Filter and paginate employees
  const filteredList = list.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedList = filteredList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <TableContainer
        style={{
          maxHeight: "400px", // Set the desired height
          overflow: "auto", // Enable scroll within the table
          scrollbarWidth: "thin", // For Firefox, reduces scrollbar width
          scrollbarColor: isDarkMode ? "#888 rgb(91, 88, 88)" : "#888 #f1f1f1",
        }}
      >
        <Table stickyHeader>
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
            ) : paginatedList.length > 0 ? (
              paginatedList.map((emp) => (
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
