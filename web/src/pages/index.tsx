import {
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  CircularProgress,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Table,
  TableBody,
  TableCell,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  AccountCircle,
} from "@mui/icons-material";

import Head from "next/head";
import Link from "next/link";

import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { getApiClient } from "../services/axios";
import TransactionsCard from "../components/TransactionsCard";
import { formatDate } from "../utils/formatters/formatDate";
import { PageWrap } from "materialism/components";
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operations, setOperations] = useState<ResponseData>();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useContext(AuthContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getResponseData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`app-users/${user?.username}/operations`);
      setOperations(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(user);
    getResponseData();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {!loading ? (
        <PageWrap>
          <Grid container paddingY={2}>
            <Grid item xs={6} paddingX={2}>
              <TransactionsCard
                amount={operations?.data.totalIncome}
                type="INCOME"
              />
            </Grid>
            <Grid item xs={6} paddingX={2}>
              <TransactionsCard
                amount={operations?.data.totalExpenses}
                type="EXPENSES"
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Operation Type</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operations?.data.entities.map((operation) => (
                  <TableRow
                    key={operation.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {operation.description}
                    </TableCell>
                    <TableCell align="center">${operation.amount}</TableCell>
                    <TableCell align="center">
                      {operation.operationType}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(operation.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PageWrap>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);
  const { finances_token: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
