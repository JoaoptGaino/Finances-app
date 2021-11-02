import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

enum Type {
  INCOME,
  EXPENSES,
}
interface CardProps {
  type: string;
  amount?: number;
}
export default function BasicCard({ type, amount }: CardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent style={{ alignContent: "center" }}>
        <Typography variant="h4" component="div">
          {type}
        </Typography>

        {type === "INCOME" ? (
          <Typography variant="h5" style={{ color: "green" }}>
            ${amount}
          </Typography>
        ) : (
          <Typography variant="h5" style={{ color: "red" }}>
            ${amount}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">
          Check out {(type === "INCOME" && "INCOMES") || "EXPENSES"}
        </Button>
      </CardActions>
    </Card>
  );
}
