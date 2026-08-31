import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// GET /api/tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await api("/tasks");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/tasks/{id}
export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId, { rejectWithValue }) => {
    try {
      return await api(`/tasks/${taskId}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/tasks
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      return await api("/tasks", {
        method: "POST",
        body: JSON.stringify(taskData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT /api/tasks/{id}
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      return await api(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(taskData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE /api/tasks/{id}
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await api(`/tasks/${taskId}`, {
        method: "DELETE",
      });

      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ONE
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        const existingIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );

        if (existingIndex !== -1) {
          state.tasks[existingIndex] = action.payload;
        } else {
          state.tasks.push(action.payload);
        }
      })

      // CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;