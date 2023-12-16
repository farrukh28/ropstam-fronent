import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
};

const authUserSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const { userData, token } = action.payload;
      const newState = {
        ...state,
        user: userData,
        token,
      };
      return newState;
    },
    removeAuthUser: () => {
      const newState = {
        ...initialState,
      };
      return newState;
    },
  },
});

export const { removeAuthUser, setAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
