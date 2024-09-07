import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import employees from "./data";

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ json: () => Promise.resolve(employees), ok: true });
      }, 1000);
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch employees: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching employees: ${error.message}`);
  }
});

const initialState = {
  employees: [],
  currentIndex: 0,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    previousEmployee: (state) => {
      state.currentIndex = Math.max(state.currentIndex - 1, 0);
    },
    nextEmployee: (state) => {
      state.currentIndex = Math.min(
        state.currentIndex + 1,
        state.employees.length - 1
      );
    },
    // getEmployeeById: (state, action) => {
    //   const employee = state.employees.find(
    //     (employee) => employee.id === action.payload
    //   );
    //   return employee;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "idle";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, previousEmployee, nextEmployee } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;

/* Selector Memoization*/


const getEmployeeById = (employees, employeeId) => {
  return employees.find((employee) => employee.id === employeeId);
};

export const selectEmployeeById = createSelector(
  (state) => state.employees.employees,
  getEmployeeById,
);

/* Selector Memoization*/

