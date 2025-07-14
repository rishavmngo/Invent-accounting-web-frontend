import { InvoiceGenT } from "@/types/transactionGen.type";
import { apiClient, ApiResponse } from ".";

export const getAllTransaction = async (ownerId: number) => {
  try {
    const response: ApiResponse<InvoiceGenT[]> = await apiClient(
      "/transaction/getAll",
      {
        method: "POST",
        body: JSON.stringify({ user_id: ownerId }),
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addSale = (data: any) =>
  apiClient("/transaction/sale/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
