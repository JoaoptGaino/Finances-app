import AccountCircle from "@mui/icons-material/AccountCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useState } from "react";
import rootStore from "../../stores/root";
import NavTabs from "./NavTabs";

const Item = styled(MenuItem)(({ theme }) => ({
  "& svg": {
    marginRight: theme.spacing(1),
  },
}));

const Center = styled(Box)({
  display: "flex",
  alignItems: "center",
});

function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Center>
            <Tooltip title="Navegação">
              <IconButton
                data-cy="drawerBtn"
                edge="start"
                sx={{ marginRight: 2 }}
                color="inherit"
                onClick={rootStore.openDrawer}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <Hidden smDown>
              <Typography sx={{ marginLeft: 3 }} variant="h5">
                {rootStore.pages.getPageTitle(router.pathname)}
              </Typography>
            </Hidden>
          </Center>

          <Center>
            <Hidden mdDown>
              <Typography>{rootStore.user.data?.username}</Typography>
            </Hidden>

            <div>
              <Tooltip title="User Options">
                <IconButton onClick={handleMenu} color="inherit" size="large">
                  <AccountCircle />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={open}
                onClose={handleClose}
              >
                <Item
                  onClick={() => {
                    console.log("logout");
                  }}
                  sx={{ color: "red" }}
                >
                  <MeetingRoomIcon fontSize="small" />
                  Sair
                </Item>
              </Menu>
            </div>
          </Center>
        </Toolbar>
      </AppBar>

      <NavTabs />
    </>
  );
}

export default observer(Navbar);
