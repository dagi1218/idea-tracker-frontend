import type { DefaultLayoutState } from "../../app/layouts/DefaultLayout/slice/types";
import type { HomePageState } from "../../app/pages/HomePage/slice/types";

export interface RootState {
    defaultLayout?: DefaultLayoutState;
    homePage?: HomePageState;
}
