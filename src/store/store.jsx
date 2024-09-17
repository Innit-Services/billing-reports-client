import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../module/employee/EmployeeSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export default store;