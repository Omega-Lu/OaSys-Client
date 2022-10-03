export interface Sale {
  saleID: number;
  userID: number;
  customerAccountID: number;
  paymentID: number;
  date: Date;
  total: number;
  returned: boolean;
}
