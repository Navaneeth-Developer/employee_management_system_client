import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/employees";

// export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
//   const response = await axios.get(BASE_URL);
//   return response.data;
// });
export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data; // Return the fetched data
    } catch (error) {
      // Handle error by rejecting the thunk with error details
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch employees"
      );
    }
  }
);

// export const addEmployee = createAsyncThunk(
//   "employees/add",
//   async (employee,) => {
//     const response = await axios.post(BASE_URL, employee);

//     return response.data;
//   }
// );

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, employee);

      // Call fetchEmployees after successfully adding an employee
      thunkAPI.dispatch(fetchEmployees());

      return response.data; // Return the added employee's data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const updateEmployee = createAsyncThunk(
//   "employees/update",
//   async ({ id, employee }) => {
//     const response = await axios.put(`${BASE_URL}/${id}`, employee);
//     return response.data;
//   }
// );

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, employee }, thunkAPI) => {
    try {
      // Perform the API request to update the employee
      const response = await axios.put(`${BASE_URL}/${id}`, employee);

      // Call fetchEmployees to refresh the list after updating
      thunkAPI.dispatch(fetchEmployees());

      // Return the updated employee data
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the API request
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update employee"
      );
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (emp) => emp.id === action.payload.id
        );
        state.list[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((emp) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
