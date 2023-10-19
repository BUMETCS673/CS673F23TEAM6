import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  email: string;
  token: string;
  rule: "admin" | "user" | "";
}
const initialState: UserState = { email: "", token: "", rule: "" };

export const userSlice = createSlice({
  name: "user", // state数据的初始值
  initialState: initialState,
  reducers: {
    setInfo(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.rule = action.payload.rule;
      localStorage.setItem("info", JSON.stringify(state));
    },
    setLocalState(state) {
      const info = JSON.parse(localStorage.getItem("info") || "{}");
      state.email = info?.email;
      state.token = info?.token;
      state.rule = info?.rule;
    },
    logOut(state) {
      localStorage.clear();
      state = initialState;
    },
  },
});
export const { setInfo, setLocalState, logOut } = userSlice.actions;
export default userSlice.reducer;
