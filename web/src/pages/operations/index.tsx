import { useRouter } from "next/router";
import { useTableQuery } from "materialism/hooks";
import { AddButton, PageWrap } from "materialism/components";
import { Filters } from "materialism/filters";
import MuiTable from "materialism/table";
import Head from "next/head";

import { Edit } from "@mui/icons-material";
import { Grid, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { api } from "../../services/api";
import operationsColumns from "./columns";
import { useEffect, useState } from "react";

interface OperationResponse {
  count: number;
  data: { [key: string]: any }[];
}
export default function Operations() {
  const router = useRouter();
  const [operations, setOperations] = useState<OperationResponse>();
  const filters: Filter[] = [
    {
      field: "description",
      title: "Description",
      type: "string",
    },
    {
      field: "amount",
      title: "Amount",
      type: "string",
    },
    {
      field: "operationType",
      title: "Operation",
      type: "string",
    },
    {
      field: "date",
      title: "Date",
      type: "string",
    },
  ];

  async function getOperations() {
    try {
      const response = await api.get("/operations");
      console.log(response.data);
      setOperations(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getOperations();
  }, []);

  return (
    <PageWrap>
      <Head>
        <title>Operations</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {operations ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={operations.data}
                columns={operationsColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
      <AddButton data-cy="add-operation" />
    </PageWrap>
  );
}
