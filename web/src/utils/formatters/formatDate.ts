import moment from "moment";

export const formatDate = (date: Date) => {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }
  return "Data não informada";
};
