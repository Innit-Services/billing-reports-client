import { configureStore } from '@reduxjs/toolkit';
import {employeeReducer} from '../module/employee/employeeSlice';

const store = configureStore({
  reducer: {
    employees : employeeReducer
  },
});

export default store;