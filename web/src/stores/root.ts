import { snackbarStore } from "materialism/stores";
import { makeAutoObservable } from "mobx";
import PagesStore from "./pages";
import UserStore from "./user";

class RootStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  snackbar = snackbarStore;
  pages = new PagesStore();
  user = new UserStore();

  isDrawerOpen = false;

  openDrawer() {
    this.isDrawerOpen = true;
  }
  closeDrawer() {
    this.isDrawerOpen = false;
  }

  tabs: string[] = [];
  activeTab = 0;

  useTabs(tabs: string[]) {
    if (!tabs.length) this.activeTab = 0;

    this.tabs = tabs;
  }
  handleChangeTab(_event: unknown, newValue: number) {
    this.activeTab = newValue;
  }
}

const rootStore = new RootStore();
export default rootStore;
