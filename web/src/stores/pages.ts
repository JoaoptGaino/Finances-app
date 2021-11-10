import { DashboardOutlined, MoneyOutlined } from "@mui/icons-material";
import { makeAutoObservable } from "mobx";
export const pages = [
  {
    id: "dashboard",
    title: "Dashboard",
    url: "/",
    icon: DashboardOutlined,
    drawer: true,
  },
  {
    id: "operations",
    title: "Operations",
    url: "/operations",
    icon: MoneyOutlined,
    drawer: true,
  },
];

class PagesStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  list = pages;

  getPageTitle(pathname: string) {
    return this.list.find((page) => page.url === pathname)?.title || "";
  }

  get drawerPages() {
    return this.list.filter((page) => page.drawer);
  }
}

export default PagesStore;
