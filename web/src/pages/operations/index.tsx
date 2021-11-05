import { useRouter } from "next/router";
import { useTableQuery } from "materialism/hooks";
import { AddButton, PageWrap } from "materialism/components";
import { Filters } from "materialism/filters";
import MuiTable from "materialism/table";
import Head from "next/head";

import { Edit } from "@mui/icons-material";
import { Grid } from "@mui/material";

import { api } from "../../services/api";
import operationsColumns from "./columns";

export default function Operations() {
  const router = useRouter();

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
  //FIXME: ELE ESPERA POR DATA, VOCÊ TA ENVIANDO ENTITIES, MANÉ
  const operationsQuery = useTableQuery({
    path: "/operations",
    api,
  });

  return (
    <PageWrap>
      <Head>
        <title>Operations</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Filters filters={filters} listHook={operationsQuery} />
        </Grid>
        <Grid item xs={12}>
          <MuiTable
            listHook={operationsQuery}
            columns={operationsColumns}
            actions={[
              {
                title: "Editar",
                icon: Edit,
                onClick: (id) => router.push(`${router.pathname}/${id}`),
              },
            ]}
          />
        </Grid>
      </Grid>
      <AddButton data-cy="add-operation" />
    </PageWrap>
  );
}
