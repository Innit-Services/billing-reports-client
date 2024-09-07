import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../employeeSlice";

import { useNavigate } from "react-router-dom";
import { Backdrop, Chip, CircularProgress } from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const EmployeeList = () => {
  const { employees, status, error } = useSelector((state) => state.employees);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (status === "error") {
    return <p>Error: {error}</p>;
  }

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "department", label: "Department", minWidth: 100 },
    { id: "jobTitle", label: "Job", minWidth: 170 },
    { id: "salary", label: "Salary", minWidth: 100 },
    { id: "phoneNumber", label: "Phone", minWidth: 170 },
    { id: "performanceRating", label: "Rating", minWidth: 170 , chip: true},
    { id: "hireDate", label: "Hire Date", minWidth: 170 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigateTo = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <>
      <Paper sx={{ overflow: "hidden", marginInline:1 }} elevation={3}>

        <TableContainer sx={{ maxHeight: 580 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth, fontWeight: '550' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => {
                  return (
                    <TableRow hover key={employee.id} sx={{ cursor: "pointer" }} onClick={() => navigateTo(employee.id)}>
                      {columns.map((column) => { 
                        const value = employee[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                             {column.chip ? <Chip label={value} color= {`${'Exceeds Expectations'=== value ? 'success' : ''}`} size="small"/> : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination rowsPerPageOptions={[5, 10, 25, 100]} component="div" count={employees.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>

      </Paper>
    </>
  );
};
export default EmployeeList;
