import { GridColDef } from "@mui/x-data-grid";

const operationsColumns: GridColDef[] = [
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    flex: 1,
  },
  { field: "amount", headerName: "Amount", minWidth: 250, flex: 1 },
  {
    field: "operationType",
    headerName: "Operation Type",
    minWidth: 250,
    flex: 1,
  },
  { field: "date", headerName: "Date", width: 300 },
];

export default operationsColumns;
