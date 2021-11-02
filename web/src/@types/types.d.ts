interface Category {
  id: string;
  name: string;
}

interface ResponseData {
  total: number;
  data: {
    entities: Operations[];
    totalAmount: number;
    totalIncome: number;
    totalExpenses: number;
  };
}
interface Operations {
  id: string;
  description: string;
  amount: string;
  operationType: string;
  date: Date;
}
