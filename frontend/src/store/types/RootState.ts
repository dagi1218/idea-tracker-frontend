import type { DefaultLayoutState } from "../../app/layouts/DefaultLayout/slice/types.js";
import type { HomePageState } from "../../app/pages/HomePage/slice/types.js";
import type { UserDashboardState } from '../../app/pages/UserDashboard/slice/types.js';
export interface RootState {
    defaultLayout?: DefaultLayoutState;
    homePage?: HomePageState;
    userDashboard?: UserDashboardState;
}
