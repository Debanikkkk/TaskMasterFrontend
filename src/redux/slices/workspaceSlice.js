import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  dashboardData: null,
  loading: false,
  error: null,
};

// GET /api/workspaces
export const fetchWorkspaces = createAsyncThunk(
  "workspaces/fetchWorkspaces",
  async (_, { rejectWithValue }) => {
    try {
      return await api("/workspaces");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/workspaces/{id}
export const fetchWorkspaceById = createAsyncThunk(
  "workspaces/fetchWorkspaceById",
  async (workspaceId, { rejectWithValue }) => {
    try {
      return await api(`/workspaces/${workspaceId}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/workspaces
export const createWorkspace = createAsyncThunk(
  "workspaces/createWorkspace",
  async (workspaceData, { rejectWithValue }) => {
    try {
      return await api("/workspaces", {
        method: "POST",
        body: JSON.stringify(workspaceData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT /api/workspaces/{id}
export const updateWorkspace = createAsyncThunk(
  "workspaces/updateWorkspace",
  async ({ id, workspaceData }, { rejectWithValue }) => {
    try {
      return await api(`/workspaces/${id}`, {
        method: "PUT",
        body: JSON.stringify(workspaceData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE /api/workspaces/{id}
export const deleteWorkspace = createAsyncThunk(
  "workspaces/deleteWorkspace",
  async (workspaceId, { rejectWithValue }) => {
    try {
      await api(`/workspaces/${workspaceId}`, {
        method: "DELETE",
      });

      return workspaceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/workspaces/dashboard
export const fetchDashboardData = createAsyncThunk(
  "workspaces/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      return await api("/workspaces/dashboard");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspaces",

  initialState,

  reducers: {
    clearCurrentWorkspace: (state) => {
      state.currentWorkspace = null;
    },

    clearWorkspaceError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaces = action.payload;
      })

      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchWorkspaceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWorkspaceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkspace = action.payload;
      })

      .addCase(fetchWorkspaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.workspaces.push(action.payload);
      })

      .addCase(createWorkspace.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        const index = state.workspaces.findIndex(
          (workspace) => workspace.id === action.payload.id
        );

        if (index !== -1) {
          state.workspaces[index] = action.payload;
        }

        if (state.currentWorkspace?.id === action.payload.id) {
          state.currentWorkspace = action.payload;
        }
      })

      .addCase(updateWorkspace.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.workspaces = state.workspaces.filter(
          (workspace) => workspace.id !== action.payload
        );

        if (state.currentWorkspace?.id === action.payload) {
          state.currentWorkspace = null;
        }
      })

      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DASHBOARD
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
      })

      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  clearCurrentWorkspace,
  clearWorkspaceError,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;