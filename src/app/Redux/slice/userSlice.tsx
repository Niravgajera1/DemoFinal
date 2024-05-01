import { createSlice } from "@reduxjs/toolkit";

interface userData {
  id: string;
  name: string;
  email: string;
  createdCampaigns: object[];
  contributedCampaigns: object[];
}

interface userState {
  id: string | null;
  name: string | null;
  email: string | null;
  createdCampaigns: object[] | null;
  contributedCampaigns: object[] | null;
}

const initialState: userState = {
  id: null,
  name: null,
  email: null,
  createdCampaigns: null,
  contributedCampaigns: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email, createdCampaigns, contributedCampaigns } =
        action.payload;
      // console.log(data, ">>>>>userDataSet");
      state.id = _id;
      state.name = name;
      state.email = email;
      state.contributedCampaigns = contributedCampaigns;
      state.createdCampaigns = createdCampaigns;

      //   console.log(state.createdCampaigns, ">>>>>>>>>>>>campigns");
    },
  },
});

export const { setUser } = userSlice.actions;

export const contributedCampaigns = (state: { user: userState }) =>
  state.user.contributedCampaigns;
export const createdCampaigns = (state: { user: userState }) =>
  state.user.createdCampaigns;
export default userSlice.reducer;
