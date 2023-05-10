import { idolDataSlice } from "./idolData";
import { reportSchedulesSlice } from "./reportSchedules";
import { authSlice } from "./auth";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    reportSchedule: reportSchedulesSlice.reducer,
    idolData: idolDataSlice.reducer,
  },
});

export default store;
