import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EmployeeService from './EmployeeService';

export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async () => {
        const response = await EmployeeService.getAllEmployees();
        console.log(response.data);
        return response.data;
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (employee_code) => {
        await EmployeeService.delEmployee(employee_code);
        return employee_code;
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (employeeData) => {
        const response = await EmployeeService.updateemployee(employeeData.departmentName, employeeData.designationName, employeeData);
        return response.data;
    }
);

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        searchQuery: '',
        filter: '',
        currentEmployee: null,
        selectedProfile: null,  
        sortField: null,
        sortOrder: null,
        status: 'idle',
        currentPage: 1,
        employeesPerPage: 8,
    },
    reducers: {
        setCurrentEmployee(state, action) {
            state.currentEmployee = state.employees.find(emp => emp.employee_code === action.payload);
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
        
        setSort(state, action) {
            state.sortField = action.payload.sortField;
            state.sortOrder = action.payload.sortOrder;
        },
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        setEmployeesPerPage(state, action) {
            state.employeesPerPage = action.payload;
        },

        setSelectedProfile(state, action) { 
            state.selectedProfile = action.payload;
        },
        clearSelectedProfile(state) { 
            state.selectedProfile = null;
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload;
                // Optionally, if currentEmployee was previously set and exists in the new employee list, update it
                if (state.currentEmployee) {
                    state.currentEmployee = state.employees.find(emp => emp.employee_code === state.currentEmployee.employee_code) || null;
                }
            })
            .addCase(fetchEmployees.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(employee => employee.employee_code !== action.payload);
                // If the deleted employee was the current one, clear currentEmployee
                if (state.currentEmployee && state.currentEmployee.employee_code === action.payload) {
                    state.currentEmployee = null;
                }
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.map(employee =>
                    employee.employee_code === action.payload.employee_code ? action.payload : employee
                );
                // Update currentEmployee if necessary
                if (state.currentEmployee && state.currentEmployee.employee_code === action.payload.employee_code) {
                    state.currentEmployee = action.payload;
                }
            });
    },
});

export const { 
    setSearchQuery, 
    setFilter, 
    setSortField, 
    setSortOrder, 
    setPage, 
    setSort,
    setEmployeesPerPage,
    setCurrentEmployee,
    setSelectedProfile, // Export new action
    clearSelectedProfile 
} = employeeSlice.actions;

export default employeeSlice.reducer; 
