import { apiClient } from ".";

export const addSale = (data: any) =>
  apiClient("/transaction/sale/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
